/**
 * Hex dump options.
 */
export default interface {
  /**
   * Number of bytes to display per line. (default 16)
   * @type {number}
   */
  hexBlock: number,

  /**
   * Number of bytes to display adjacently. (default 1)
   * @type {number}
   */
  hexGroup: number,

  /**
   * Delimiter between byte characters. (default ' ')
   * @type {string}
   */
  hexSep: string,

  /**
   * A character that is displayed when it cannot be represented as a byte character. (default '  ')
   * @type {string}
   */
  hexEmpty: string,

  /**
   * a function that accepts a byte value and returns a hexen readable, two character representation of that byte. By default, the hexen representation is lower-case zero-padded hex.
   * @type {(byte: number) => string}
   */
  hexRender: (byte: number) => string,

  /**
   * Set to true to display the offset column. (default true) 
   * @type {boolean}
   */
  offsetShow: boolean,

  /**
   * Delimiter between offset and byte columns. (default '  ')
   * @type {string}
   */
  offsetSep: string,

  /**
   * Minimum number of digits to display in the offset column. (default 8)
   * @type {number}
   */
  offsetWidth: number

  /**
   * Set to true to display ASCII columns. (default true) 
   * @type {boolean}
   */
  asciiShow: boolean,

  /**
   * Delimiter between byte string and ASCII string. (default '  ')
   * @type {string}
   */
  asciiSep: string,

  /**
   * Character to be displayed when it cannot be expressed as ASCII character. (default '')
   * @type {string}
   */
  asciiEmpty: string,

  /**
   * The empty line will be expressly rendered, with offset zero, empty byte columns, and this string in the human readable characters section. (default '')
   * @type {string}
   */
  asciiNull: string,

  /**
   * a function that accepts a byte value and returns a human readable, single character representation of that byte. By default, the human representation is the character itself for all printable ASCII characters, and a period "." for control characters and EASCII bytes.
   * @type {(byte: number) => string}
   */
  asciiRender: (byte: number) => string

  // , decorateHex: (offset: number, screenOffset: number, byte: string) => string,
  // decorateAscii: (offset: number, screenOffset: number, byte: string) => string
}