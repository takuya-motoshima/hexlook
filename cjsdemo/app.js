const hexlook = require('hexlook');

// 0byte
// Output: ''
{
  const payload = [];
  const dump = hexlook(Buffer.from(payload));
  console.log(dump);
}

// 8byte
// Output: 00000000  01 02 03 04 05 06 07 08                          |........|
{
  const payload = [0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08];
  const dump = hexlook(Buffer.from(payload));
  console.log(dump);
}

// 16 bytes w/ whale
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
{
  const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00];
  const dump = hexlook(Buffer.from(payload));
  console.log(dump);
}

// 24 bytes w/ whale & octopus
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
//         00000010  00 6f 63 74 6f 70 75 73                          |.octopus|
{
  const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
  const dump = hexlook(Buffer.from(payload));
  console.log(dump);
}

// asciiNull works
// Output: 00000000                                                   |empty|
{
  const payload = [];
  const dump = hexlook(Buffer.from(payload), {asciiNull: 'empty'});
  console.log(dump);
}

// hex(24 bytes w/ whale & octopus + asciiRender option)
// Output: 00000000  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |whale|
//         00000010  00 6f 63 74 6f 70 75 73                          |octopus|
{
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
}

// 24 bytes w/ whale & octopus + offsetWidth option
// Output: 00  00 00 00 00 00 00 77 68 61 6c 65 00 00 00 00 00  |......whale.....|
//         10  00 6f 63 74 6f 70 75 73                          |.octopus|
{
  const payload = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x77, 0x68, 0x61, 0x6c, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6f, 0x63, 0x74, 0x6f, 0x70, 0x75, 0x73];
  const dump = hexlook(Buffer.from(payload), {offsetWidth: 2});
  console.log(dump);
}


// test('hex(string)', function t(assert) {
//     assert.equal(hex('what even is a buffer?'),
//         '00: 7768 6174 2065 7665 6e20 6973 2061 2062  what even is a b\n' +
//         '10: 7566 6665 723f                           uffer?');
//     assert.end();
// });

// test('hex(invalid)', function t(assert) {
//     assert.throws(function() {
//         hex(undefined);
//     }, 'no hex(undefined)');
//     assert.throws(function() {
//         hex(null);
//     }, 'no hex(null)');
//     assert.throws(function() {
//         hex(123);
//     }, 'no hex(number)');
//     assert.throws(function() {
//         hex([]);
//     }, 'no hex(Array)');
//     assert.throws(function() {
//         hex({});
//     }, 'no hex(Object)');
//     assert.end();
// });