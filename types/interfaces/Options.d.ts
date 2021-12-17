/**
 * Hex dump options.
 */
export default interface  {
    /**
     * Number of bytes to display per line. (default 16)
     * @type {number}
     */
    blockSize: number;
    /**
     * Number of bytes to display adjacently. (default 1)
     * @type {number}
     */
    hexGroup: number;
    /**
     * Delimiter between offset and byte columns. (default '  ')
     * @type {string}
     */
    offsetSep: string;
    /**
     * Delimiter between byte characters. (default ' ')
     * @type {string}
     */
    hexSep: string;
    /**
     * Delimiter between byte string and ASCII string. (default '  ')
     * @type {string}
     */
    asciiSep: string;
    /**
     * A character that is displayed when it cannot be represented as a byte character. (default '  ')
     * @type {string}
     */
    emptyHex: string;
    /**
     * Character to be displayed when it cannot be expressed as ASCII character. (default '')
     * @type {string}
     */
    emptyAscii: string;
    /**
     * The empty line will be expressly rendered, with offset zero, empty byte columns, and this string in the human readable characters section. (default '')
     * @type {string}
     */
    nullAscii: string;
    /**
     * Minimum number of digits to display in the offset column. (default 8)
     * @type {number}
     */
    offsetWidth: number;
    /**
     * a function that accepts a byte value and returns a hexen readable, two character representation of that byte. By default, the hexen representation is lower-case zero-padded hex.
     * @type {(byte: number) => string}
     */
    renderHex: (byte: number) => string;
    /**
     * a function that accepts a byte value and returns a human readable, single character representation of that byte. By default, the human representation is the character itself for all printable ASCII characters, and a period "." for control characters and EASCII bytes.
     * @type {(byte: number) => string}
     */
    renderAscii: (byte: number) => string;
}
