import {GameState} from "../models/gameState";
import {BoardState} from "../models/boardState";
import {CellState} from "../models/cellState";
import {GenericClue} from "../models/clues/genericClue";
import {randomInt} from "./randomService";
import {generateClueSet} from "./clueGenerator";
import {without} from "typescript-array-utils";
import {trySolve} from "./boardSolver";

export function initRandomBoard(): Array<CellState> {
  const cells: Array<CellState> = [];
  for (let i = 0; i < 6; i++) {

    const numbers = getShuffledArray();
    for (let j = 0; j < 6; j++) {
      cells.push(new CellState(i*6+j, {proper: numbers[j]}))
    }
  }
  return cells;
}

function getShuffledArray(): number[] {
  const initial = [0,1,2,3,4,5];
  for (let i=0; i<6; i++) {
    const index = Math.floor(Math.random()*6);
    const temp = initial[i];
    initial[i] = initial[index];
    initial[index] = temp;
  }
  return initial;
}

export function updateBoardStateWithCell(state: BoardState, cell: CellState) {
  return new BoardState([...state.cellStates.slice(0, cell.index), cell, ...state.cellStates.slice(cell.index+1)]);
}

interface GeneratedRuleSet {
  board: BoardState,
  clues: Array<GenericClue>,
}

export function initRandomConfiguration(difficulty: number): GameState {
  let currentPuzzle;
  do {
    currentPuzzle = generateRuleSet(new BoardState(), difficulty);
  } while (!currentPuzzle)
  return new GameState({
    state: currentPuzzle.board,
    clueset: currentPuzzle.clues,
    difficulty: difficulty,
    prevStates: []
  });
}

function openRandomCell(field: BoardState): BoardState {
  let line;
  let position;
  let newField = field.clone();
  do {
    line = randomInt(6);
    position = randomInt(6);
  } while (newField.getCell(line, position).isSolved());

  let cell = newField.getCell(line, position);
  newField = updateBoardStateWithCell(newField, cell.resolveTo(cell.properSolution));
  newField = optimizeBoard(newField);
  return newField;
}

export function optimizeBoard(field: BoardState) : BoardState {
  let newField = field.clone();
  for (let i=0; i<6; i++) {
    newField = optimizeLine(newField, i);
  }
  return newField;
}

export function optimizeLine(field: BoardState, line: number): BoardState {
  let newField = field.clone();
  for (let i=0; i<6; i++) {
    let foundAt = findOnlyPossiblePositionAtLine(newField, line, i);
    if (foundAt !== -1) {
      let cell = newField.getCell(line, foundAt);
      if (!cell.isSolved()) {
        newField = updateBoardStateWithCell(newField, cell.resolveTo(i));
      }
    }
  }
  for (let i=0; i<6; i++) {
    if (newField.getCell(line, i).isSolved()) {
      for (let j=0; j<6; j++) {
        if (j !== i) {
          newField = removeItemAndCheckResolved(newField, j, newField.getCell(line, i).getCurrentSolution(), line);
        }
      }
    }
  }
  return newField;
}

function findOnlyPossiblePositionAtLine(state: BoardState, line: number, item: number): number {
  let position = -1;
  for (let i=0; i<6; i++) {
    if (state.getCell(line, i).hasPossibleItem(item)) {
      if (position === -1) {
        position = i;
      }
      else {
        return -1;
      }
    }
  }
  return position;
}

function removeItemAndCheckResolved(field: BoardState, position: number, item: number, lineNumber: number): BoardState {
  let newField = field.clone();
  let cell = newField.getCell(lineNumber, position);
  if (cell.hasPossibleItem(item)) {
    let newCell = cell.removePossibleTurn(item);
    newField = updateBoardStateWithCell(newField, newCell);
    if (newCell.isSolved()) {
      newField = optimizeLine(newField, lineNumber);
    }
  }
  return newField;
}

function generateRuleSet(field: BoardState, difficulty: number): GeneratedRuleSet | undefined {
  let clues = new Array<GenericClue>();
  let newField = field.clone();
  for (let i=0; i< difficulty*5; i++) {
    newField = openRandomCell(newField);
  }
  let fieldClone;
  while(true) {
    clues = generateClueSet(newField, difficulty);
    fieldClone = newField.clone();
    let res = checkOpenedCells(fieldClone, clues);
    fieldClone = res.board;
    if (res.openedCells <= 2) {
      clues = shuffleClues(clues);
      clues = shrinkClues(fieldClone, clues)?? [];
      if (clues.length > 0) {
        break;
      }
    }
  }

  let result = fieldClone.clone();
  fieldClone = trySolve(fieldClone, clues);
  if (fieldClone.getNotResolvedCellCount() !== 0) {
    return undefined;
  }
  return {board: result, clues: clues};
}

function shuffleClues(clues: GenericClue[]): GenericClue[] {
  let newClues = Array.from(clues);
  for (let i=0; i<newClues.length; ++i) {
    let position = randomInt(newClues.length);
    let temp = newClues[i];
    newClues[i] = newClues[position];
    newClues[position] = temp;
  }
  return newClues;
}

function shrinkClues(field: BoardState, clues: GenericClue[]): GenericClue[] | undefined {
  for (let i=clues.length-1; i>=0; i--) {
    let fieldClone = field.clone();
    let cluesClone = Array.from(clues);
    cluesClone = without(cluesClone, i);
    fieldClone = trySolve(fieldClone, cluesClone);
    if (fieldClone.getNotResolvedCellCount() === 0) {
      let next = shrinkClues(field, cluesClone);
      return next?? cluesClone;
    }
  }
  return clues;
}

interface CheckOpenedCellsResult {
  board: BoardState,
  openedCells: number,
}

function checkOpenedCells(field: BoardState, clues: GenericClue[]): CheckOpenedCellsResult {
  let opened = 0;
  let newField = field.clone();
  while (true) {
    let current = trySolve(newField, clues);
    if (current.getNotResolvedCellCount() > 0) {
      opened++;
      if (opened === 3) {
        //Too much initially opened, giving up
        return {board: newField, openedCells: opened};
      }
      //Opening one cell and repeat
      newField = openRandomCell(newField);
    }
    else {
      //Puzzle solved, rule set is acceptable for this board
      break;
    }
  }
  return {board: newField, openedCells: opened};
}