import { infer as Infer, lazy, ZodType, object, literal, array, undefined as Undefined } from 'zod';
import { Student as _Student, Teacher as _Teacher } from '../../../.yarn/__virtual__/@runtyping-test-type-writers-virtual-f1a80c3a62/1/packages/test-type-writers/fixtures/source/circular-references';

export const Teacher: ZodType<_Teacher> = lazy(() => object({ type: literal("teacher"), students: array(Student).or(Undefined()).optional(), reportsTo: Teacher.or(Undefined()).optional(), }));

export type Teacher = Infer<typeof Teacher>;

export const Student: ZodType<_Student> = lazy(() => object({ type: literal("student"), teacher: Teacher, }));

export type Student = Infer<typeof Student>;

export const User = Student.or(Teacher);

export type User = Infer<typeof User>;
