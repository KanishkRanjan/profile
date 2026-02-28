"use client"

import { useState, useRef } from "react"
import { Music, Pause, Loader2 } from "lucide-react"

const STREAMS = [
    "https://streams.fluxfm.de/Chillhop/mp3-128/streams.fluxfm.de/", // FluxFM Chillhop
    "https://play.streamafrica.net/lofi", // Box Radio
    "https://stream.zeno.fm/0r0xa792kwzuv", // Zeno FM
    "https://lofi.stream.laut.fm/lofi?t302=2024-05-13_20-13-44&uuid=d43a854d-7647-4950-8458-1f3e7262d1d4" // Laut.fm
]

export function LofiPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isBuffering, setIsBuffering] = useState(false)
    const [streamIndex, setStreamIndex] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const togglePlay = async () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            setIsBuffering(true)
            try {
                await audioRef.current.play()
                setIsPlaying(true)
            } catch (error) {
                console.error("Playback failed:", error)
                // Try next stream if play fails immediately
                handleError()
            } finally {
                setIsBuffering(false)
            }
        }
    }

    const handleError = () => {
        const nextIndex = (streamIndex + 1) % STREAMS.length
        console.log(`Stream failed, switching to source ${nextIndex}: ${STREAMS[nextIndex]}`)
        setStreamIndex(nextIndex)
        // If we were playing, try to play the new stream automatically
        if (isPlaying || isBuffering) {
            setIsBuffering(true)
            // Small timeout to allow ref update
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(console.error)
                }
            }, 100)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <audio
                ref={audioRef}
                src={STREAMS[streamIndex]}
                preload="none"
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onError={(e) => {
                    const error = e.currentTarget.error
                    console.error("Audio error detail:", error?.code, error?.message)
                    handleError()
                }}
            />
            <button
                onClick={togglePlay}
                disabled={isBuffering}
                className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer group disabled:opacity-50"
                aria-label={isPlaying ? "Pause Lofi Music" : "Play Lofi Music"}
            >
                <span className="font-mono text-sm group-hover:underline decoration-border decoration-2 underline-offset-4">
                    LOFI
                </span>
                {isBuffering ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : isPlaying ? (
                    <Pause className="w-3 h-3 text-primary animate-pulse" />
                ) : (
                    <Music className="w-3 h-3" />
                )}
            </button>
        </div>
    )
}
