import { Null, Record, Static, String, Undefined } from 'runtypes';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = Null;

export type A = Static<typeof A>;

export const B = Null.Or(String);

export type B = Static<typeof B>;

export const C = Record({ a: Null, b: Null.Or(String), c: Null.Or(String).Or(Undefined).optional(), });

export type C = Static<typeof C>;
