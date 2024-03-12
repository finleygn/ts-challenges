/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

  For example

  ```ts
  type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */

type Whitespace = "\n" | "\t" | " ";

type TrimLeft<S extends string> = S extends `${infer X}${infer R}`
  ? X extends Whitespace 
    ? TrimLeft<R>
    : S
  : S

type LastChar<S extends string> = S extends `${infer T}${infer E}`
  ? E extends "" ? T : LastChar<E>
  : S

type AllButLast<S extends string, L extends string> = S extends `${infer T}${L}`
  ? T
  : S

type TrimRight<S extends string> = S extends `${infer X}${infer R}`
  ? LastChar<R> extends Whitespace 
    ? TrimRight<`${X}${AllButLast<R,LastChar<R>>}`>
    : S
  : S

type Trim<T extends string> = TrimLeft<TrimRight<T>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
