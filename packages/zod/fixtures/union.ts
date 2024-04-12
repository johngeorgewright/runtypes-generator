import { infer as Infer, number, string } from 'zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const C = string().or(number());

export type C = Infer<typeof C>;