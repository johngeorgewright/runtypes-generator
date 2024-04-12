import { array, infer as Infer, never as Never, record, string } from 'zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = Never();

export type A = Infer<typeof A>;

export const B = record(string(), Never());

export type B = Infer<typeof B>;

export const C = array(Never());

export type C = Infer<typeof C>;