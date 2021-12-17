const hexlook = require('hexlook');

// echo -n "0123456789abcdef" | hexdump -ve '1/1 "%.2x"'
// 30313233343536373839616263646566
// echo -n "0123456789abcdef" | hexdump -ve '1/1 "%.4x"'
// 0030003100320033003400350036003700380039006100620063006400650066
// echo -n "0123456789abcdef" | hexdump -ve '1/1 "%.2x "'
// 30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66 
// echo -n "0123456789abcdef" | hexdump -ve '1/1 "%.4x "'
// 0030 0031 0032 0033 0034 0035 0036 0037 0038 0039 0061 0062 0063 0064 0065 0066 
// const hex = require('hexer');
// console.log(hex(payload, {group: 1, blockSize: 16}));
// console.log(hex(payload, {blockSize: payload.length, group: 1, hexSep: ''}));
// echo -n "0123456789abcdef"|hexdump -C
// 00000000  30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66  |0123456789abcdef|

const payload = '0123456789abcdef';
console.log(hexlook(payload));
// 00000000  30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66  |0123456789abcdef|

console.log(hexlook('0123456789abcdef', {
  blockSize: payload.length,
  hexSep: ''
}));
