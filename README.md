# hexlook

Dumps data in hexadecimal format.  
Provides a single function to take an array of bytes and display it in hexadecimal form.

- [hexlook](#hexlook)
  - [Install](#install)
  - [Usage](#usage)
  - [Options](#options)
  - [Author](#author)
  - [License](#license)

## Install
```sh
npm i hexlook
```

## Usage
For ESM
```js
import hexlook from 'hexlook';
```

For CJS
```js
const hexlook = require('hexlook');
```

string
```js
// Output: 00000000  59 65 61 68 2c 20 69 74 27 73 20 6d 79 20 6c 69  |Yeah, it's my li|
//         00000010  66 65 2e 20 4d 79 20 6f 77 6e 20 77 6f 72 64 73  |fe. My own words|
//         00000020  2c 20 49 67 75 65 73 73 2e                       |, Iguess.|
const payload = 'Yeah, it\'s my life. My own words, Iguess.';
const dump = hexlook(payload);
console.log(dump);
```

Get only hex columns in one row
```js
// 596561682c2069742773206d79206c6966652e204d79206f776e20776f7264732c204967756573732e
const payload = 'Yeah, it\'s my life. My own words, Iguess.';
const dump = hexlook(payload, {
  hexBlock: payload.length,
  hexGroup: 1,
  hexSep: '',
  offsetShow: false,
  asciiShow: false
});
console.log(dump);
```

0 byte
```js
// Output: ''
const payload = [];
const dump = hexlook(Buffer.from(payload));
console.log(dump);
```

8 bytes
```js
// Output: 00000000  01 02 03 04 05 06 07 08                          |........|
const payload = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08];
const dump = hexlook(Buffer.from(payload));
console.log(dump);
```

16 bytes w/ whale
```js
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00];
const dump = hexlook(Buffer.from(payload));
console.log(dump);
```

24 bytes w/ whale & octopus
```js
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
//         00000010  00 6f 63 74 6f 70 75 73                          |.octopus|
const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
const dump = hexlook(Buffer.from(payload));
console.log(dump);
```

asciiNull works
```js
// Output: 00000000                                                   |empty|
const payload = [];
const dump = hexlook(Buffer.from(payload), {asciiNull: 'empty'});
console.log(dump);
```

hex(24 bytes w/ whale & octopus + asciiRender option)
```js
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |whale|
//         00000010  00 6f 63 74 6f 70 75 73                          |octopus|
const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
const dump = hexlook(Buffer.from(payload), {
  // Convert unicode to characters.
  asciiRender: byte => {
    if (byte > 0x1f && byte < 0x7f)
      return String.fromCharCode(byte);
    else
      return '';
  }
});
console.log(dump);
```

24 bytes w/ whale & octopus + offsetWidth option
```js
// Output: 00  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
//         10  00 6f 63 74 6f 70 75 73                          |.octopus|
const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
const dump = hexlook(Buffer.from(payload), {offsetWidth: 2});
console.log(dump);
```

Passing undefined parameter will result in an error
```js
// Output: payload is unknown
try {
  const payload = undefined;
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
```

Passing null parameter will result in an error
```js
// Output: payload is unknown
try {
  const payload = null;
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
```

Passing numeric parameter will result in an error
```js
// Output: payload is unknown
try {
  const payload = 123;
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
```

Passing array parameter will result in an error
```js
// Output: payload is unknown
try {
  const payload = [];
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
```

Passing object parameter will result in an error
```js
// Output: payload is unknown
try {
  const payload = {};
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
```

## Options
<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Discription</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>hexBlock</td>
      <td>number</td>
      <td>Number of bytes to display per line. (default 16)</td>
    </tr>
    <tr>
      <td>hexGroup</td>
      <td>number</td>
      <td>Number of bytes to display adjacently. (default 1)</td>
    </tr>
    <tr>
      <td>hexSep</td>
      <td>string</td>
      <td>Delimiter between byte characters. (default &#039; &#039;)</td>
    </tr>
    <tr>
      <td>hexEmpty</td>
      <td>string</td>
      <td>A character that is displayed when it cannot be represented as a byte character. (default &#039;  &#039;)</td>
    </tr>
    <tr>
      <td>hexRender</td>
      <td>(byte: number) => string</td>
      <td>A function that accepts a byte value and returns a hexen readable, two character representation of that byte. By default, the hexen representation is lower-case zero-padded hex.</td>
    </tr>
    <tr>
      <td>offsetShow</td>
      <td>boolean</td>
      <td>Set to true to display the offset column. (default true)</td>
    </tr>
    <tr>
      <td>offsetSep</td>
      <td>string</td>
      <td>Delimiter between offset and byte columns. (default &#039;  &#039;)</td>
    </tr>
    <tr>
      <td>offsetWidth</td>
      <td>number</td>
      <td>Minimum number of digits to display in the offset column. (default 8)</td>
    </tr>
    <tr>
      <td>asciiShow</td>
      <td>boolean</td>
      <td>Set to true to display ASCII columns. (default true)</td>
    </tr>
    <tr>
      <td>asciiSep</td>
      <td>string</td>
      <td>Delimiter between byte string and ASCII string. (default &#039;  &#039;)</td>
    </tr>
    <tr>
      <td>asciiEmpty</td>
      <td>string</td>
      <td>Character to be displayed when it cannot be expressed as ASCII character. (default &#039;&#039;)</td>
    </tr>
    <tr>
      <td>asciiNull</td>
      <td>string</td>
      <td>The empty line will be expressly rendered, with offset zero, empty byte columns, and this string in the human readable characters section. (default &#039;&#039;)</td>
    </tr>
    <tr>
      <td>asciiRender</td>
      <td>(byte: number) => string</td>
      <td>A function that accepts a byte value and returns a human readable, single character representation of that byte. By default, the human representation is the character itself for all printable ASCII characters, and a period &quot;.&quot; for control characters and EASCII bytes.</td>
    </tr>
  </tbody>
</table>

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)