import { ObjectType, ArrayType, AcceptedTypes } from "./types"
const sumObjects = (a: ObjectType, b: ObjectType, positive: boolean) =>
  Object.fromEntries(
    Object.keys(a).map((key): [key: string, value: any] => [
      key,
      sum(a[key], b[key], positive),
    ])
  )

const sumArrays = <T extends ArrayType>(a: T, b: T, positive: boolean): T =>
  a.map((a_value, i) => sum(a_value, b[i], positive)) as T

export const sum = <T extends AcceptedTypes>(
  a: T,
  b: T,
  positive = true
): T => {
  if (!a || !b) {
    return a || b
  }

  if (a instanceof Array && b instanceof Array) {
    return sumArrays(a, b, positive) as T
  } else if (a instanceof Object && b instanceof Object) {
    return sumObjects(a, b, positive) as T
  } else {
    return (positive ? +a + +b : +a - +b) as T
  }
}
