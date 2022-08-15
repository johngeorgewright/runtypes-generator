import { Static, Lazy, Runtype, Record, String, Array } from 'runtypes'
import {
  A as _A,
  B as _B,
} from '../../../.yarn/__virtual__/@runtyping-test-type-writers-virtual-f1a80c3a62/1/packages/test-type-writers/fixtures/source/recursive'

export const A: Runtype<_A> = Lazy(() => Record({ recurse: String.Or(A) }))

export type A = Static<typeof A>

export const B: Runtype<_B> = Lazy(() => Record({ recurse: Array(B) }))

export type B = Static<typeof B>
