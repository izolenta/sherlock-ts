export class GenericClue {
  readonly description: string;
  readonly isUsed: boolean;
  readonly items: Array<GenericClue>;

  constructor(descr: string, items: Array<GenericClue>, isUsed: boolean = false) {
    this.description = descr;
    this.items = items;
    this.isUsed = isUsed;
  }

  isEqual(clue: GenericClue): boolean {
    if (this.items.length !== clue.items.length) {
      return false;
    }
    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index] != clue.items[index]) {
        return false;
      }
    }
    return true;
  }
}
