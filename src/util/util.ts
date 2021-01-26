import {replace, without} from "typescript-array-utils";

export function removeElement<T>(a: T[], element: T): T[] {
  let index = a.indexOf(element);
  if (index >-1) {
    return without(a, index);
  }
  return a;
}

export function replaceElement<T>(a: T[], oldElement: T, newElement: T): T[] {
  let index = a.indexOf(oldElement);
  if (index >-1) {
    return replace(a, index, newElement);
  }
  return a;
}