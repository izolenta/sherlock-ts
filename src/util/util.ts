import {without} from "typescript-array-utils";

export function removeElement<T>(a: T[], element: T): T[] {
  let index = a.indexOf(element);
  if (index >-1) {
    return without(a, index);
  }
  return a;
}