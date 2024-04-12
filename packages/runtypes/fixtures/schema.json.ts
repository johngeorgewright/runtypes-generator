import { Literal, Number, Record, Static, String, Undefined } from 'runtypes';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const ExampleSchema = Record({ firstName: String, lastName: String, age: Number.Or(Undefined).optional(), hairColor: Literal("black").Or(Literal("brown")).Or(Literal("blue")).Or(Undefined).optional(), });

export type ExampleSchema = Static<typeof ExampleSchema>;