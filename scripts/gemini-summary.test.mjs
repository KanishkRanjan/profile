import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { collectContributions } from './contribution-sync.mjs';
import { validateDraft, generateSummary, gatherEvidence } from './gemini-summary.mjs';
const docs = [{ id: 'diff-0', text: 'Added a native icon validation check.', url: 'https://example.com' }];
const claim = { text: 'Added a native icon validation check.', support: [{ source: 'diff-0', quote: 'Added a native icon validation check.' }] };
const good = { status: 'ready', claims: [claim] };
const response = obj => new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(obj) }] } }] }));
test('reject abstention, forged quotes, absent diff evidence, metrics and excessive claims', () => {
  validateDraft(good, docs);
  for (const bad of [{status:'abstain',claims:[]}, {...good,claims:[{...claim,text:'Improved performance by 90 percent.'}]}, {...good,claims:[{...claim,support:[{source:'diff-0',quote:'This quotation was invented.'}]}]}, {...good,claims:[claim,claim,claim]}]) assert.throws(()=>validateDraft(bad,docs));
  assert.throws(()=>validateDraft({...good,claims:[{...claim,support:[{source:'description',quote:claim.text}]}]},[{...docs[0],id:'description'}]));
});
test('generation and independent verification are required; cached evidence uses zero calls',async()=>{
 let calls=0;
 const fetcher=async(url,opts)=>{calls++;assert.equal(opts.headers['x-goog-api-key'],'fake');assert.equal(opts.redirect,'error');return response(calls===1?good:{approved:true,reason:'Every claim is supported by the supplied diff.'});};
 const result=await generateSummary(docs,{key:'fake',fetcher});
 assert.equal(calls,2);assert.deepEqual(result.description,[claim.text]);
 await generateSummary(docs,{cached:result,fetcher:()=>{throw Error('Must not call model');}});
 assert.equal(calls,2);
});
test('no key, quota failure, verifier rejection, incomplete output all fail closed',async()=>{
 await assert.rejects(generateSummary(docs,{key:''}),/not configured/);
 let calls=0;
 await assert.rejects(generateSummary(docs,{key:'fake',fetcher:async()=>{calls++;return new Response('',{status:429});}}),/429/);assert.equal(calls,1);
 calls=0;await assert.rejects(generateSummary(docs,{key:'fake',fetcher:async()=>response(++calls===1?good:{approved:false,reason:'Unsupported effect'})}),/Verifier/);
 await assert.rejects(generateSummary(docs,{key:'fake',fetcher:async()=>new Response(JSON.stringify({candidates:[{finishReason:'MAX_TOKENS'}]}))}),/Incomplete/);
});
test('partial GitHub diffs cannot reach the model',async()=>{
 const s={provider:'github',project:'owner/repo',author:'author'};
 await assert.rejects(gatherEvidence(s,{number:1,title:'Title',link:'https://example.com'},async url=>url.endsWith('/pulls/1')?{merged_at:'date',user:{login:'author'},changed_files:2}:[{filename:'file',patch:'one patch'}]),/Incomplete file list/);
});
test('all existing entries and dates remain byte-identical despite upstream/config changes',async()=>{
 const config=JSON.parse(await readFile('config/contributions.json','utf8'));
 const previous=JSON.parse(await readFile('data/contributions.json','utf8'));
 const original=JSON.stringify(previous);
 config.sources=config.sources.filter(s=>s.provider==='github');config.sources[0].overrides={};config.sources[0].exclude=[55057];
 let modelCalls=0;
 const next=await collectContributions(config,previous,{now:new Date('2030-01-01'),fetcher:async()=>new Response(JSON.stringify({total_count:1,items:[{number:55057,title:'Changed upstream title',body:'Changed body',user:{login:'KanishkRanjan'},labels:[],pull_request:{merged_at:'2030-01-01T00:00:00Z'}}]})),generateSummary:()=>{modelCalls++;throw Error('must never run');}});
 assert.equal(JSON.stringify(next),original);assert.equal(modelCalls,0);
});
test('new uncertain entries are held without a fallback and cycle budget is enforced',async()=>{
 const cfg={version:1,ai:{enabled:true,maxNewEntries:1},groups:[{id:'g',name:'G',role:'Contributor'}],sources:[{id:'s',provider:'github',group:'g',project:'owner/repo',author:'a'}]};
 const items=[1,2].map(number=>({number,title:'A change',body:'Body',labels:[],user:{login:'a'},pull_request:{merged_at:'2026-01-01T00:00:00Z'}}));
 let calls=0;const held=[];
 const result=await collectContributions(cfg,undefined,{fetcher:async()=>new Response(JSON.stringify({total_count:2,items})),gatherEvidence:async()=>docs,generateSummary:async()=>{calls++;throw Error('uncertain');},held});
 assert.equal(calls,1);assert.equal(result.groups[0].contributions.length,0);assert.equal(held.length,1);
});
