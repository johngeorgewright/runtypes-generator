import { Record, Static, String, Undefined } from 'runtypes';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = Record({ foo: String.Or(Undefined).optional(), });

export type A = Static<typeof A>;