import { intersection, literal, number, partial, string, type, TypeOf, undefined as Undefined, union } from 'io-ts';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const ExampleSchema = intersection([type({ firstName: string, lastName: string, }), partial({ age: union([number, Undefined,]), hairColor: union([literal("black"), literal("brown"), literal("blue"), Undefined,]), })]);

export type ExampleSchema = TypeOf<typeof ExampleSchema>;