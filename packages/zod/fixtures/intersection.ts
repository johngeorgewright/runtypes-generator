import { infer as Infer, object, string } from 'zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = object({ foo: string(), });

export type A = Infer<typeof A>;

export const B = object({ bar: string(), });

export type B = Infer<typeof B>;

export const C = A.and(B);

export type C = Infer<typeof C>;