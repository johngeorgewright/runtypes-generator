import { infer as Infer, null as Null, object, string } from 'zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const FooType = Null().or(string());

export type FooType = Infer<typeof FooType>;

export const HorseType = object({ a: FooType, b: FooType, });

export type HorseType = Infer<typeof HorseType>;