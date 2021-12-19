import Options from '~/interfaces/Options';

/**
 * Dumps data in hexadecimal format.
 * Provides a single function to take an array of bytes and display it in hexadecimal form.
 *
 * @param   {Buffer|string} payload String to dump.
 * @param   {Options}       opts    Hex dump options.
 * @return  {string}                Dump result.
 */
export default function(payload: Buffer|string, opts: Partial<Options> = {}): string {
  /**
   * Render offset column.
   */
  function renderOffsetColumn(): void {
    const offsetBlk = pad('0', _totalOffset.toString(16), _opts.offsetWidth);
    _line = offsetBlk + _opts.offsetSep;
  }

  /**
   * Render Hex and ASCII column.
   */
  function renderHexAndAsciiColumn(): void {
    if (_opts.offsetShow && !_line.length)
    // if (!_line.length)
      return;
    let rem = _screenOffset % _opts.hexBlock;
    if (rem !== 0 || (_totalOffset === 0 && _opts.asciiNull)) {
      rem = _opts.hexBlock - rem;
      for (let i=0; i<rem; i++)
        setHexPart(_opts.hexEmpty, _opts.asciiEmpty);
    }
    _line += _hexCol;
    if (_opts.asciiShow)
      _line += '  ' + _opts.asciiSep + _asciiCol + _opts.asciiSep;
    _result.push(_line);
    _line = '';
    _hexCol = '';
    _asciiCol = '';
  }

  /**
   * Render part of hex column.
   *
   * @param {string} hex      Hexadecimal character.
   * @param {string} asciiCol ASCII characters.
   * @param {number} byte     Byte character.
   */
  function setHexPart(hex: string, ascii: string, byte?: number): void {
    // hex = _opts.decorateHex(_totalOffset, _screenOffset, hex, byte);
    // ascii = _opts.decorateAscii(_totalOffset, _screenOffset, ascii, byte);
    const isStartOfLine = _screenOffset % _opts.hexBlock === 0;
    const isStartOfGroup = _screenOffset % _opts.hexGroup === 0;
    if (!isStartOfLine && isStartOfGroup)
      _hexCol += _opts.hexSep;
    _hexCol += hex;
    _asciiCol += ascii;
    _totalOffset++;
    _screenOffset++;
  }

  /**
   * Converts a byte array into a hex string.
   *
   * @param   {number} byte Byte character.
   * @returns {string}      Hexadecimal character.
   */
  function byteToHex(byte: number): string {
    return pad('0', byte.toString(16), 2);
  }

  /**
   * Convert unicode to characters.
   *
   * @param   {number} byte Byte character.
   * @returns {string}      Unicode character.
   */
  function byteToAscii(byte: number): string {
    if (byte > 0x1f && byte < 0x7f)
      return String.fromCharCode(byte);
    else
      return '.';
  }

  /**
   * Pad string with specific characters.

   * @param   {string} char   Character to pad.
   * @param   {string} str    Original string.
   * @param   {string} width  Overall width of characters.
   * @returns {string}        Returns a string.
   */
  function pad(char: string, str: string, width: number): string {
    while (str.length < width)
      str = char + str;
    return str;
  }

  // Check parameters.
  if (typeof payload === 'string')
    payload = Buffer.from(payload);
  else if (!Buffer.isBuffer(payload))
    throw new Error('payload is unknown');

  // Init options.
  // if (!opts.offsetWidth)
  //   opts.offsetWidth = 2 * Math.ceil(payload.length.toString(16).length / 2);
  let _opts: Required<Options> = Object.assign({
    hexBlock: 16,
    hexGroup: 1,
    hexSep: ' ',
    hexEmpty: '  ',
    hexRender: byteToHex,
    offsetShow: true,
    offsetSep: '  ',
    offsetWidth: 8,
    asciiShow: true,
    asciiSep: '|',
    asciiEmpty: '',
    asciiNull: '',
    asciiRender: byteToAscii
    // decorateHex: (offset, screenOffset, byte) => str,
    // decorateAscii: (offset, screenOffset, byte) => str,
  }, opts);

  let _result: string[] = [];
  let _line: string = '';
  let _hexCol: string = '';
  let _asciiCol: string = '';
  let _screenOffset: number = 0;
  let _totalOffset: number = 0;

  // Dumps data in hexadecimal format.
  for (let offset=0; offset<payload.length; offset++) {
    if (_screenOffset % _opts.hexBlock === 0) {
      renderHexAndAsciiColumn();
      if (_opts.offsetShow)
        renderOffsetColumn();
    }
    const byte = payload[offset];
    const hex = _opts.hexRender(byte);
    const ascii = _opts.asciiRender(byte);
    setHexPart(hex, ascii, payload[offset]);
  }
  if (_totalOffset === 0 && _opts.asciiNull) {
    if (_opts.offsetShow)
      renderOffsetColumn();
    _asciiCol += _opts.asciiNull;
  }
  renderHexAndAsciiColumn();
  return _result.join('\n');
}