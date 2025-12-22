import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * ASCII Character Set Definitions
 *
 * Character sets are ordered from dark (low brightness) to light (high brightness).
 * The shader maps pixel brightness to character index, so the first character
 * represents the darkest pixels and the last represents the brightest.
 *
 * To add a new character set:
 * 1. Add an entry to ASCII_CHARSETS with a unique key
 * 2. Order characters from dark → light (spaces/dots first, dense chars last)
 * 3. The key becomes available in CharsetKey type automatically
 */
declare const ASCII_CHARSETS: {
    /** Classic 10-character gradient - good balance of detail and performance */
    readonly standard: {
        readonly name: "Standard";
        readonly chars: " .:-=+*#%@";
    };
    /** Unicode block characters - chunky retro aesthetic */
    readonly blocks: {
        readonly name: "Blocks";
        readonly chars: " ░▒▓█";
    };
    /** Minimal 5-character set - high contrast, fast rendering */
    readonly minimal: {
        readonly name: "Minimal";
        readonly chars: " .oO@";
    };
    /** Binary on/off - pure silhouette mode */
    readonly binary: {
        readonly name: "Binary";
        readonly chars: " █";
    };
    /** 70-character gradient - maximum detail, best for high resolution */
    readonly detailed: {
        readonly name: "Detailed";
        readonly chars: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    };
    /** Dot-based - pointillist aesthetic */
    readonly dots: {
        readonly name: "Dots";
        readonly chars: " ·•●";
    };
    /** Directional arrows - experimental */
    readonly arrows: {
        readonly name: "Arrows";
        readonly chars: " ←↙↓↘→↗↑↖";
    };
    /** Moon phases - decorative gradient */
    readonly emoji: {
        readonly name: "Emoji";
        readonly chars: "  ░▒▓🌑🌒🌓🌔🌕";
    };
};
/** Type-safe key for selecting character sets */
type CharsetKey = keyof typeof ASCII_CHARSETS;

interface AsciiStats {
    fps: number;
    frameTime: number;
}
interface UseVideoToAsciiOptions {
    fontSize?: number;
    colored?: boolean;
    blend?: number;
    highlight?: number;
    charset?: CharsetKey;
    maxWidth?: number;
    onStats?: (stats: AsciiStats) => void;
}
interface VideoToAsciiProps extends UseVideoToAsciiOptions {
    src: string;
    enableMouse?: boolean;
    trailLength?: number;
    enableRipple?: boolean;
    rippleSpeed?: number;
    audioReactivity?: number;
    audioSensitivity?: number;
    showStats?: boolean;
    className?: string;
}

declare function VideoToAscii({ src, fontSize, colored, blend, highlight, charset, maxWidth, enableMouse, trailLength, enableRipple, rippleSpeed, audioReactivity, audioSensitivity, showStats, className, }: VideoToAsciiProps): react_jsx_runtime.JSX.Element;

export { ASCII_CHARSETS, type CharsetKey, VideoToAscii, type VideoToAsciiProps };
