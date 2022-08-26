import { any as Any, array, infer as Infer, object, record, string, undefined as Undefined, unknown as Unknown } from 'zod';
import { validators } from '@runtyping/zod';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const ExampleSchema = object({
  testArray: array(Any())
    .min(2)
    .superRefine((data, ctx) => {
      validators.pipeIssues({
        ctx,
        data: data[0],
        path: 0,
        type: record(string(), Unknown())
      });
      validators.pipeIssues({
        ctx,
        data: data[1],
        path: 1,
        type: record(string(), Unknown())
      });
      validators.pipeIssues({
        ctx,
        data: data.slice(2, undefined),
        path: `2-${2 + data.slice(2, undefined).length}`,
        type: array(record(string(), Unknown()))
      });
    }).or(Undefined()).optional(),
});

export type ExampleSchema = Infer<typeof ExampleSchema>;