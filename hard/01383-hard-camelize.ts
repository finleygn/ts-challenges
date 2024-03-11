/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion

  ### Question

  Implement Camelize which converts object from snake_case to to camelCase

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > View on GitHub: https://tsch.js.org/1383
*/

/* _____________ Your Code Here _____________ */

type CharMap = {
  'a': "A",
  'b': "B",
  'c': "C",
  'd': "D",
  'e': "E",
  'f': "F",
  'g': "G",
  'h': "H",
  'i': "I",
  'j': "J",
  'k': "K",
  'l': "L",
  'm': "M",
  'n': "N",
  'o': "O",
  'p': "P",
  'q': "Q",
  'r': "R",
  's': "S",
  't': "T",
  'u': "U",
  'v': "V",
  'w': "W",
  'x': "X",
  'y': "Y",
  'z': "Z",
}

type GetChar<T extends keyof CharMap> = CharMap[T];

type CamelWord<T> = T extends `${infer S}_${infer C}${infer R}`
  ? CamelWord<`${S}${C extends keyof CharMap ? GetChar<C> : C}${R}`>
  : T;

type Camelize<T> = T extends any [] ? {
  [K in keyof T]: T[K] extends object
    ? Camelize<T[K]>
    : T[K]
} : {
  [K in keyof T as CamelWord<K>]: T[K] extends object
    ? Camelize<T[K]>
    : T[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/
