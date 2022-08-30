import { boolean, Function, literal, number, string, type, TypeOf } from 'io-ts';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = type({ foo: string, bar: number, [`has spaces`]: boolean, [`+1`]: boolean, [`-1`]: boolean, __underscores__: boolean, $dollar: boolean, [`\${escaped template vars}`]: boolean, });

export type A = TypeOf<typeof A>;

export const B = type({ a: A, b: literal("B"), });

export type B = TypeOf<typeof B>;

export const C = type({ foo: Function, bar: number, boo: Function, });

export type C = TypeOf<typeof C>;
