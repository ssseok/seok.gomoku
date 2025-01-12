// 게임 상태 변수
let boardState; // 17x17 바둑판 상태
let currentPlayer = 'black'; // 현재 플레이어 (흑돌부터 시작)

// 게임 상태 초기화 함수
export function resetBoardState() {
    // 17x17 배열 생성, 모든 셀을 null로 초기화 (돌이 놓이지 않음)
    boardState = Array(17)
        .fill(null)
        .map(() => Array(17).fill(null));

    // 바둑돌 배치판의 모든 시각적 요소 초기화
    const cells = go.querySelectorAll('td');
    cells.forEach((cell) => {
        cell.className = '';
        cell.style.backgroundColor = '';
    });

    currentPlayer = 'black'; // 현재 플레이어를 흑돌로 초기화
}

// 다음 플레이어로 전환 함수
export function switchPlayer() {
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
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

        if (count >= 5) return true; // 5개 이상의 돌이 연속되면 승리
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

export { boardState, currentPlayer };
