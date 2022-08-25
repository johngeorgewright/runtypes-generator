import { InstanceOf, Record, Static } from 'runtypes';

export const A = Record({ a: InstanceOf(Uint8Array), });

export type A = Static<typeof A>;