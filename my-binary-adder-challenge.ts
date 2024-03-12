import type { Equal, Expect } from '@type-challenges/utils'
import { ExpectFalse, NotEqual } from '@type-challenges/utils'
import { Pow, Add, Multiply } from 'ts-arithmetic';

type Bit = 0 | 1;

type B_NOT<A extends Bit> = 
    A extends 1 ? 0 : 1

type B_AND<A extends Bit, B extends Bit> = 
  B extends 1
    ? A extends 1 
      ? 1 
      : 0 
    : 0;

type B_NAND<A extends Bit, B extends Bit> = 
  B_NOT<B_AND<A,B>>

type B_OR<A extends Bit, B extends Bit> = 
  B_NOT<B_AND<B_NAND<A,B>, B_AND<B_NOT<A>,B_NOT<B>>>>

type B_XOR<A extends Bit, B extends Bit> = 
  A extends B ? 0 : 1

type ResultWrapper<A extends Bit,B extends Bit> = {
  S: A;
  C: B
}

type HalfAdder<A extends Bit, B extends Bit> =
  ResultWrapper<B_XOR<A, B>, B_AND<A, B>>

type FullAdder<
  A extends Bit,
  B extends Bit,
  C extends Bit = 0
> = ResultWrapper<
  HalfAdder<HalfAdder<A, B>['S'], C>['S'],
  B_OR<
    HalfAdder<HalfAdder<A, B>['S'], C>['C'],
    HalfAdder<A, B>['C']
  >
>

type BinaryAdd<A extends Bit[], B extends Bit[] & { length: A['length'] }, C extends Bit = 0> = 
  A extends [...infer A_TAIL, infer A_HEAD]
    ? B extends [...infer B_TAIL, infer B_HEAD]
      ? A_HEAD extends Bit
        ? B_HEAD extends Bit
          ? A_TAIL extends Bit[]
            ? B_TAIL extends Bit[]
              ? FullAdder<A_HEAD, B_HEAD, C> extends ResultWrapper<infer SUM, infer CARRY>
                ? [...BinaryAdd<A_TAIL, B_TAIL, CARRY>, SUM]
                : []
              : never
            : never
          : never
        : never
      : C extends 1 ? [C] : []
    : C extends 1 ? [C] : [];


// ESCAPE BINARY HELPER

type BCD<T extends Bit[], D extends number = 0> = T extends [...infer R, infer H]
  ? H extends Bit
    ? R extends Bit[]
      ? Add<Multiply<H, D extends 0 ? 0 : Pow<2, D>>, BCD<R, Add<D, 1>>>
      : 0
    : 0
  : 0


// RESULTS
// 
type Test_A = [1,1,1,0,0,0,1,0,1,1,0,1,0,0,1,1,0,1]; // 325
type Test_B = [1,0,1,0,0,0,1,0,1,0,1,1,1,0,0,1,0,1]; // 197

type H = BinaryAdd<[1,0,1,0,1,1,1,0],[1,0,0,0,1,1,0,0]>;

type cases = [
  Expect<Equal<
    BinaryAdd<[1],[1]>,
    [1,0]
  >>,
  Expect<Equal<
    BinaryAdd<[0],[1]>,
    [1]
  >>,
  Expect<Equal<
    BinaryAdd<[1,1,0],[0,0,1]>,
    [1,1,1]
  >>,
  Expect<Equal<
    BinaryAdd<[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1]>,
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0]
  >>,
  Expect<Equal<
    BinaryAdd<[1,0,1,0,1,1,1,0],[1,0,0,0,1,1,0,0]>,
    [1,0,0,1,1,1,0,1,0]
  >>, 
]

type R = BCD<BinaryAdd<Test_A,Test_B>>;
