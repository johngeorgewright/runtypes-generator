import { intersection, number, string, type, Type, TypeOf, union } from 'io-ts';

// This file is generated by runtyping (https://github.com/johngeorgewright/runtyping).
// Manual changes might be lost - proceed with caution!
export const A = <T extends any,>(T: Type<T>,) => type({ type: T, });

export type A<T> = TypeOf<ReturnType<typeof A<T>>>;

export const B = <T extends string,>(T: Type<T>,) => type({ type: T, });

export type B<T extends string> = TypeOf<ReturnType<typeof B<T>>>;

export const C = <T extends any,>(T: Type<T>,) => union([string, T,]);

export type C<T> = TypeOf<ReturnType<typeof C<T>>>;

export const D = <T extends number,>(T: Type<T>,) => type({ type: T, });

export type D<T extends number> = TypeOf<ReturnType<typeof D<T>>>;

export const E = type({ foo: string, });

export type E = TypeOf<typeof E>;

export const F = <T extends TypeOf<typeof E>,>(T: Type<T>,) => type({ type: T, });

export type F<T extends E> = TypeOf<ReturnType<typeof F<T>>>;

export const G = type({ abc: A(type({ data: string, }),), });

export type G = TypeOf<typeof G>;

export const Test = <T extends any,>(T: Type<T>,) => intersection([T, type({ count: number, }),]);

export type Test<T> = TypeOf<ReturnType<typeof Test<T>>>;

export const Foo = type({ abc: Test(type({ data: string, }),), });

export type Foo = TypeOf<typeof Foo>;