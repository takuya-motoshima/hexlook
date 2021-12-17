/**
 * Hex dump options.
 */
export default interface  {
    blockSize: number;
    hexGroup: number;
    offsetGutter: number;
    hexSep: string;
    offsetSep: string;
    asciiSep: string;
    emptyHex: string;
    emptyAscii: string;
    nullAscii: string;
    offsetWidth: number;
    renderHex: (byte: number) => string;
    renderAscii: (byte: number) => string;
}