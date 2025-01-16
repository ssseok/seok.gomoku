import { resetBoardState, resetTimers } from './gameLogic.js';
import { createCheckerboard, createPlacementBoard } from './view.js';
import { addEventListeners } from './eventHandlers.js';

const table = document.getElementById('table'); // 시각적인 오목판
const go = document.getElementById('go'); // 바둑돌이 놓일 위치를 표시하는 판

// 화점 위치
const starPoints = [
    [3, 3],
    [3, 9],
    [3, 15],
    [9, 3],
    [9, 9],
    [9, 15],
    [15, 3],
    [15, 9],
    [15, 15],
];

// 게임 초기화
initializeGame();

// 게임 초기화
function initializeGame() {
    table.innerHTML = '';
    go.innerHTML = '';
    resetBoardState();
    resetTimers();
    createCheckerboard(table, starPoints);
    createPlacementBoard(go);
    addEventListeners(go);
}
