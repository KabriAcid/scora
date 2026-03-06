import { useEffect, useRef, useCallback } from "react";

/**
 * Preloads an audio file once on mount and returns a stable `play()` function.
 * The browser caches the decoded audio after the first fetch — subsequent plays
 * are instant with no network round-trip.
 *
 * Usage:
 *   const playDing = useCachedAudio("/sounds/ding.mp3");
 *   playDing(); // call anywhere
 */
export function useCachedAudio(src: string): () => void {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(src);
        // "auto" tells the browser to fully download and buffer the file
        audio.preload = "auto";
        audio.load(); // trigger download immediately
        audioRef.current = audio;

        return () => {
            // Release reference; the browser keeps the response in its HTTP cache
            audioRef.current = null;
        };
    }, [src]);

    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Rewind so rapid successive plays always fire from the start
        audio.currentTime = 0;

        // play() returns a Promise; the browser may reject it if the user hasn't
        // interacted with the page yet (autoplay policy). We swallow that silently.
        audio.play().catch(() => {/* blocked by autoplay policy — no-op */ });
    }, []);

    return play;
}
