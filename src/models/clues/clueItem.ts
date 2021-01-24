export class ClueItem {
  readonly line: number;
  readonly item: number;

  constructor(clueLine: number, clueItem: number) {
    this.line = clueLine;
    this.item = clueItem;
  }

  isEqual(item: ClueItem): boolean {
    return item.line === this.line && item.item === this.item;
  }
}