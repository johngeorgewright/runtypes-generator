import { array, failure, partial, record, string, success, Type, TypeOf, undefined as Undefined, union, unknown as Unknown } from 'io-ts';

export const ExampleSchema = partial({
  testArray: union([array(Unknown).pipe(new Type<[{ [k: string]: unknown; }, { [k: string]: unknown; }, ...{ [k: string]: unknown; }[]], [{ [k: string]: unknown; }, { [k: string]: unknown; }, ...{ [k: string]: unknown; }[]], unknown[]>(
    '[{ [k: string]: unknown; }, { [k: string]: unknown; }, ...{ [k: string]: unknown; }[]]',
    (u): u is [{ [k: string]: unknown; }, { [k: string]: unknown; }, ...{ [k: string]: unknown; }[]] =>
      Array.isArray(u) && u.length >= 2
      && record(string, Unknown).is(u[0])
      && record(string, Unknown).is(u[1])
      && array(record(string, Unknown)).is(u.slice(2, undefined)),
    (i, c) =>
      i.length >= 2
        && record(string, Unknown).is(i[0])
        && record(string, Unknown).is(i[1])
        && array(record(string, Unknown)).is(i.slice(2, undefined))
        ? success(i as [{ [k: string]: unknown; }, { [k: string]: unknown; }, ...{ [k: string]: unknown; }[]])
        : failure(i, c, 'Variadic tuple does not match schema'),
    (a) => a
  )), Undefined,]),
});

export type ExampleSchema = TypeOf<typeof ExampleSchema>;
