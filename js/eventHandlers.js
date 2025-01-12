import {
    boardState,
    switchPlayer,
    checkWin,
    resetBoardState,
    currentPlayer,
} from './gameLogic.js';

import { isForbiddenMove } from './rules.js';

export function handleStonePlacement(e) {
    const target = e.target;
    if (target.tagName !== 'TD') return;

    const [row, col] = target.id.split('-').map(Number);

    if (boardState[row][col] !== null) {
        alert('이미 돌이 놓인 자리입니다!');
        return;
    }

    // 3-3 또는 4-4 규칙 위반 확인 (흑돌인 경우만 적용)
    if (currentPlayer === 'black' && isForbiddenMove(row, col)) {
        alert(
            '이 동작은 3-3 또는 4-4 규칙을 위반합니다. 다른 위치를 선택하세요.'
        );
        return;
    }

    boardState[row][col] = currentPlayer;
    target.classList.add(`${currentPlayer}-stone`);

    // 승리 조건 확인
    if (checkWin(row, col, currentPlayer)) {
        setTimeout(() => {
            alert(`${currentPlayer === 'black' ? '흑' : '백'}이 승리했습니다!`);
            resetBoardState();
        }, 100);
        return;
    }
    switchPlayer();
}

export function addEventListeners(go) {
    go.addEventListener('click', (e) => handleStonePlacement(e));
}
