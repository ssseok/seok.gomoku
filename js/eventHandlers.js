import {
    boardState,
    switchPlayer,
    checkWin,
    resetBoardState,
    currentPlayer,
    startTimer,
    timerRunning,
    timerInterval,
} from './gameLogic.js';

import { isForbiddenMove } from './rules.js';

export function handleStonePlacement(e) {
    const target = e.target;

    if (target.tagName !== 'TD') return;

    const [row, col] = target.id.split('-').map(Number); // 클릭된 셀의 행, 열 좌표

    // 이미 돌이 놓인 경우
    if (boardState[row][col] !== null) {
        alert('이미 돌이 놓인 자리입니다!');
        return;
    }

    // 흑돌의 경우 3-3 또는 4-4 규칙 위반 여부 확인
    if (currentPlayer === 'black' && isForbiddenMove(row, col)) {
        alert(
            '이 동작은 3-3 또는 4-4 규칙을 위반합니다. 다른 위치를 선택하세요.'
        );
        return;
    }

    // 보드 상태와 UI 업데이트
    boardState[row][col] = currentPlayer;
    target.classList.add(`${currentPlayer}-stone`); // 흑/백 돌 스타일 적용

    // 타이머가 실행 중이 아니면 시작
    if (!timerRunning) {
        startTimer();
    }

    // 승리 조건 확인
    if (checkWin(row, col, currentPlayer)) {
        clearInterval(timerInterval); // 타이머 정지
        setTimeout(() => {
            alert(`${currentPlayer === 'black' ? '흑' : '백'}이 승리했습니다!`);
            resetBoardState(); // 게임 초기화
            resetTimers(); // 타이머 초기화
        }, 100);
        return;
    }

    switchPlayer(); // 다음 플레이어로 전환
    startTimer(); // 새로운 플레이어의 타이머 시작
}

export function addEventListeners(go) {
    go.addEventListener('click', (e) => handleStonePlacement(e));
}
