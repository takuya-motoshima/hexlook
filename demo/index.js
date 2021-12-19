const hexlook = require('../dist/build.common');
// const hexlook = require('hexlook');

let payload, dump;

// string
// Output: 00000000  59 65 61 68 2c 20 69 74 27 73 20 6d 79 20 6c 69  |Yeah, it's my li|
//         00000010  66 65 2e 20 4d 79 20 6f 77 6e 20 77 6f 72 64 73  |fe. My own words|
//         00000020  2c 20 49 67 75 65 73 73 2e                       |, Iguess.|
payload = 'Yeah, it\'s my life. My own words, Iguess.';
dump = hexlook(payload);
console.log(dump);

// Get only hex columns in one row
// 596561682c2069742773206d79206c6966652e204d79206f776e20776f7264732c204967756573732e
payload = 'Yeah, it\'s my life. My own words, Iguess.';
dump = hexlook(payload, {
  hexBlock: payload.length,
  hexGroup: 1,
  hexSep: '',
  offsetShow: false,
  asciiShow: false
});
console.log(dump);

// 0byte
// Output: ''
payload = [];
dump = hexlook(Buffer.from(payload));
console.log(dump);

// 8byte
// Output: 00000000  01 02 03 04 05 06 07 08                          |........|
payload = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08];
dump = hexlook(Buffer.from(payload));
console.log(dump);

// 16 bytes w/ whale
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00];
dump = hexlook(Buffer.from(payload));
console.log(dump);

// 24 bytes w/ whale & octopus
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
//         00000010  00 6f 63 74 6f 70 75 73                          |.octopus|
payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
dump = hexlook(Buffer.from(payload));
console.log(dump);

// asciiNull works
// Output: 00000000                                                   |empty|
payload = [];
dump = hexlook(Buffer.from(payload), {asciiNull: 'empty'});
console.log(dump);

// hex(24 bytes w/ whale & octopus + asciiRender option)
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |whale|
//         00000010  00 6f 63 74 6f 70 75 73                          |octopus|
payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
dump = hexlook(Buffer.from(payload), {
  // Convert unicode to characters.
  asciiRender: byte => {
    if (byte > 0x1f && byte < 0x7f)
      return String.fromCharCode(byte);
    else
      return '';
  }
});
console.log(dump);

// 24 bytes w/ whale & octopus + offsetWidth option
// Output: 00  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
//         10  00 6f 63 74 6f 70 75 73                          |.octopus|
payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
dump = hexlook(Buffer.from(payload), {offsetWidth: 2});
console.log(dump);

// invalid
// Output: payload is unknown
try {
  const payload = undefined;
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
// Output: payload is unknown
try {
  const payload = null;
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
// Output: payload is unknown
try {
  const payload = 123;
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
// Output: payload is unknown
try {
  const payload = [];
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}
// Output: payload is unknown
try {
  const payload = {};
  hexlook(payload);
} catch(err) {
  console.error(err.message);
}