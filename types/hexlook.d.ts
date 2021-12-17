/// <reference types="node" />
import Options from '~/interfaces/Options';
/**
 * Dumps data in hexadecimal format.
 * Provides a single function to take an array of bytes and display it in hexadecimal form.
 *
 * @param   {Buffer|string} payload String to dump.
 * @param   {Options}       opts    Hex dump options.
 * @return  {string}                Dump result.
 */
export default function (payload: Buffer | string, opts?: Partial<Options>): string;
