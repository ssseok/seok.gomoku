import { boardState } from './gameLogic.js';

// 3-3,4-4 규칙 위반 확인 함수
export function isForbiddenMove(row, col) {
    boardState[row][col] = 'black'; 
    const isThreeThree = checkDoubleThree(row, col);
    const isFourFour = checkDoubleFour(row, col);
    boardState[row][col] = null;
    return isThreeThree || isFourFour;
}

// 3-3 규칙 확인 함수
function checkDoubleThree(row, col) {
    let threeDirections = []; // 열린 삼(Open Three)의 방향 저장
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1], // 가로, 세로, 대각선 ↘, 대각선 ↙
    ];

    for (const [dx, dy] of directions) {
        if (isOpenThree(row, col, dx, dy)) {
            threeDirections.push([dx, dy]); // 열린 삼 발견 시 방향 추가
        }
        if (threeDirections.length >= 2) return true; // 두 방향 이상 발견 시 3-3 규칙 위반
    }

    return false; // 3-3 규칙 위반 아님
}

// 열린 삼(Open Three) 확인 함수
function isOpenThree(row, col, dx, dy) {
    let count = 1; // 현재 돌 포함 돌 개수
    let openEnds = 0; // 열린 끝부분 개수

    // 앞쪽 방향 탐색
    let x = row + dx;
    let y = col + dy;
    while (
        x >= 0 &&
        x < 17 &&
        y >= 0 &&
        y < 17 &&
        boardState[x][y] === 'black'
    ) {
        count++;
        x += dx;
        y += dy;
    }
    if (x >= 0 && x < 17 && y >= 0 && y < 17 && boardState[x][y] === null) {
        openEnds++; // 열린 끝 발견 시 증가
    }

    // 뒤쪽 방향 탐색
    x = row - dx;
    y = col - dy;
    while (
        x >= 0 &&
        x < 17 &&
        y >= 0 &&
        y < 17 &&
        boardState[x][y] === 'black'
    ) {
        count++;
        x -= dx;
        y -= dy;
    }
    if (x >= 0 && x < 17 && y >= 0 && y < 17 && boardState[x][y] === null) {
        openEnds++; // 열린 끝 발견 시 증가
    }

    // 정확히 3개의 돌이 있고 양쪽 끝이 열려 있는지 확인
    return count === 3 && openEnds === 2;
}

// 4-4 규칙 확인 함수
function checkDoubleFour(row, col) {
    let fourCount = 0; // 정확한 사(4)의 개수
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
    ];

    for (const [dx, dy] of directions) {
        if (isExactFour(row, col, dx, dy)) {
            fourCount++;
        }
        if (fourCount >= 2) return true; // 두 방향 이상 발견 시 4-4 규칙 위반
    }

    return false; // 4-4 규칙 위반 아님
}

// 정확한 사(4) 확인 함수
function isExactFour(row, col, dx, dy) {
    let count = 1; // 현재 돌 포함 돌 개수

    // 앞쪽 방향 탐색
    let x = row + dx;
    let y = col + dy;
    while (
        x >= 0 &&
        x < 17 &&
        y >= 0 &&
        y < 17 &&
        boardState[x][y] === 'black'
    ) {
        count++;
        x += dx;
        y += dy;
    }

    // 뒤쪽 방향 탐색
    x = row - dx;
    y = col - dy;
    while (
        x >= 0 &&
        x < 17 &&
        y >= 0 &&
        y < 17 &&
        boardState[x][y] === 'black'
    ) {
        count++;
        x -= dx;
        y -= dy;
    }

    return count === 4; // 정확히 4개의 돌이 있는지 반환
}
