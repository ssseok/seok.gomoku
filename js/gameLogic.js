// 게임 상태 변수
let boardState; // 17x17 바둑판의 상태를 저장하는 배열
let currentPlayer = 'black'; // 현재 플레이어 ('black'부터 시작)
let blackTimer = 35; // 흑돌 플레이어의 남은 시간 (초 단위)
let whiteTimer = 35; // 백돌 플레이어의 남은 시간 (초 단위)
let timerInterval = null; // 현재 실행 중인 타이머의 ID
let timerRunning = false; // 타이머가 실행 중인지 확인하는 변수

// 게임 상태 초기화 함수
export function resetBoardState() {
    // 17x17 배열 생성, 모든 셀을 null로 초기화 (돌이 놓이지 않음)
    boardState = Array(17)
        .fill(null)
        .map(() => Array(17).fill(null));

    // 바둑판의 모든 셀에 초기 스타일 적용
    const cells = go.querySelectorAll('td');
    cells.forEach((cell) => {
        cell.className = '';
        cell.style.backgroundColor = '';
    });

    currentPlayer = 'black'; // 현재 플레이어를 흑돌로 초기화
}

// 다음 플레이어로 전환
export function switchPlayer() {
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
}

// 타이머 시작 함수
export function startTimer() {
    clearInterval(timerInterval); // 이전 타이머가 있으면 정지

    // 현재 플레이어의 타이머 엘리먼트 선택 및 초기화
    const activeTimerElement =
        currentPlayer === 'black'
            ? document.getElementById('black-time')
            : document.getElementById('white-time');

    // 상대 플레이어의 타이머 엘리먼트 선택 및 초기화
    const inactiveTimerElement =
        currentPlayer === 'black'
            ? document.getElementById('white-time')
            : document.getElementById('black-time');

    if (currentPlayer === 'black') {
        whiteTimer = 35;
        inactiveTimerElement.textContent = whiteTimer; // 백돌 타이머 초기화 UI 업데이트
    } else {
        blackTimer = 35;
        inactiveTimerElement.textContent = blackTimer; // 흑돌 타이머 초기화 UI 업데이트
    }

    // 현재 플레이어의 타이머
    let currentTimer = currentPlayer === 'black' ? blackTimer : whiteTimer;

    // 타이머 실행 상태 설정
    timerRunning = true;

    // 1초마다 타이머 감소
    timerInterval = setInterval(() => {
        currentTimer--; // 1초 감소
        activeTimerElement.textContent = currentTimer; // UI 업데이트

        // 현재 플레이어의 타이머 변수 업데이트
        // if (currentPlayer === 'black') {
        //     blackTimer = currentTimer;
        // } else {
        //     whiteTimer = currentTimer;
        // }

        if (currentTimer < 0) {
            // 타이머 종료 시
            clearInterval(timerInterval);
            timerRunning = false;
            alert(
                `${
                    currentPlayer === 'black' ? 'Black' : 'White'
                } 타임아웃입니다.`
            );
            resetBoardState(); // 게임 초기화
            resetTimers(); // 타이머 초기화
        }
    }, 1000);
}

// 타이머 초기화 함수
export function resetTimers() {
    blackTimer = 35;
    whiteTimer = 35;
    document.getElementById('black-time').textContent = blackTimer; // UI 업데이트
    document.getElementById('white-time').textContent = whiteTimer; // UI 업데이트
    clearInterval(timerInterval); // 타이머 정지
    timerRunning = false;
}

// 승리 조건 확인 함수
export function checkWin(row, col, player) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1], // 가로, 세로, 대각선 ↘, 대각선 ↙
    ];

    for (const [dx, dy] of directions) {
        let count = 1;
        count += countStones(row, col, dx, dy, player);
        count += countStones(row, col, -dx, -dy, player);

        if (count == 5) return true; // 5개의 돌이 연속되면 승리
    }

    return false;
}

// 특정 방향으로 연속된 돌 개수 계산 함수
function countStones(row, col, dx, dy, player) {
    let count = 0;
    let x = row + dx;
    let y = col + dy;

    while (
        x >= 0 &&
        x < 17 &&
        y >= 0 &&
        y < 17 &&
        boardState[x][y] === player
    ) {
        count++;
        x += dx;
        y += dy;
    }

    return count;
}

export { boardState, currentPlayer, timerRunning, timerInterval };
