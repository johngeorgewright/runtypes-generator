import { Static, Runtype, Record, String } from 'runtypes'

export const A = <T extends any>(T: Runtype<T>) => Record({ type: T })

export type A<T> = Static<ReturnType<typeof A<T>>>

export const B = <T extends string>(T: Runtype<T>) => Record({ type: T })

export type B<T extends string> = Static<ReturnType<typeof B<T>>>

export const C = <T extends any>(T: Runtype<T>) => Record({ type: T })

export type C<T> = Static<ReturnType<typeof C<T>>>

export const D = <T extends number>(T: Runtype<T>) => Record({ type: T })

export type D<T extends number> = Static<ReturnType<typeof D<T>>>

export const E = Record({ foo: String })

export type E = Static<typeof E>

export const F = <T extends Static<typeof E>>(T: Runtype<T>) =>
  Record({ type: T })

export type F<T extends E> = Static<ReturnType<typeof F<T>>>
