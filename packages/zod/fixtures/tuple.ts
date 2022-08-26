import { infer as Infer, number, string, tuple } from 'zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = tuple([number(), string(), number(),]);

export type A = Infer<typeof A>;

export const B = tuple([A, A,]);

export type B = Infer<typeof B>;

export const C = tuple([]);

export type C = Infer<typeof C>;