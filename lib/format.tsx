import { Fragment } from "react";

/**
 * Renders the lightweight markdown used throughout DATA: **bold** and `code`.
 *
 * Content in lib/data.tsx carries a lot of API symbol names — `BrowserWindow`,
 * `gin::Converter<net::HttpRequestHeaders>::FromV8` — which read as noise when
 * their backticks are printed literally.
 */
function renderCode(text: string, keyPrefix: string) {
  return text.split(/(`[^`]*?`)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={`${keyPrefix}-${index}`}
          className="font-mono text-[0.875em] text-foreground/90 bg-foreground/[0.07] rounded px-[0.3em] py-[0.1em] break-words"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={`${keyPrefix}-${index}`}>{part}</Fragment>;
  });
}

export function renderRichText(text: string) {
  // Bold is matched first because DATA nests code inside it — headings like
  // "**feat: support `restrictOwnAudio` constraint**". Each bold segment is
  // then scanned for code spans so the inner backticks don't print literally.
  return text.split(/(\*\*[\s\S]*?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="text-foreground font-semibold">
          {renderCode(part.slice(2, -2), `b${index}`)}
        </strong>
      );
    }

    return <Fragment key={index}>{renderCode(part, `t${index}`)}</Fragment>;
  });
}
