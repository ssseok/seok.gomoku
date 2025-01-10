// DOM 요소
const table = document.getElementById('table'); // 시각적인 오목판
const go = document.getElementById('go'); // 돌이 놓일 위치를 나타내는 판

// 게임 상태
let currentPlayer = 'black'; // 현재 플레이어 ('black' 또는 'white')
let boardState; // 17x17 배열로 게임 보드의 논리 상태를 추적

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
initializeBoard(); // 게임 시작 시 보드를 초기화

// 오목판(시각적인 바둑판) 생성
function createCheckerboard() {
    // 18행(테두리 포함)을 생성
    for (let i = 0; i < 18; i++) {
        const tr = document.createElement('tr'); // 새로운 행 생성
        table.appendChild(tr); // 오목판 테이블에 행 추가
        for (let j = 0; j < 18; j++) {
            const td = document.createElement('td'); // 새로운 셀 생성
            td.setAttribute('class', 'square'); // 스타일링을 위한 클래스 지정

            if (starPoints.some(([x, y]) => x === i && y === j)) {
                const point = document.createElement('div');
                point.setAttribute('class', 'star-point');
                td.appendChild(point);
            }

            tr.appendChild(td); // 현재 행에 셀 추가
        }
    }
}

// 바둑돌이 놓일 판 생성
function createPlacementBoard() {
    // 17행(실제 플레이 가능한 영역)을 생성
    for (let i = 0; i < 17; i++) {
        const tr = document.createElement('tr'); // 새로운 행 생성
        go.appendChild(tr); // 바둑돌 배치 테이블에 행 추가
        for (let j = 0; j < 17; j++) {
            const td = document.createElement('td'); // 새로운 셀 생성
            td.setAttribute('id', `${i}-${j}`); // 행과 열에 따라 고유 ID 지정
            tr.appendChild(td); // 현재 행에 셀 추가
        }
    }
}

// 보드를 초기화하고 게임 상태를 재설정
function initializeBoard() {
    // 기존 테이블 내용을 지우고 보드 재생성
    table.innerHTML = '';
    go.innerHTML = '';

    // 오목판 및 바둑돌 배치판 재생성
    createCheckerboard();
    createPlacementBoard();

    // 논리 및 시각적 게임 상태 재설정
    resetBoardState();

    // 돌 배치를 위한 이벤트 리스너 추가
    addEventListeners();
}

// 게임 상태 재설정
function resetBoardState() {
    // 17x17 논리 보드 초기화 (모든 셀을 null로 설정)
    boardState = Array(17)
        .fill(null)
        .map(() => Array(17).fill(null)); // 각 셀은 초기에는 비어 있음

    // 바둑돌 배치판에서 모든 시각적 요소 제거
    const cells = go.querySelectorAll('td');
    cells.forEach((cell) => {
        cell.className = ''; // 모든 클래스 제거 (black-stone, white-stone)
        cell.style.backgroundColor = ''; // 인라인 스타일 초기화
    });

    // 현재 플레이어를 검은 돌('black')로 초기화
    currentPlayer = 'black';
}

// 바둑돌 배치판에 이벤트 리스너 추가
function addEventListeners() {
    // 바둑돌 배치판에 클릭 이벤트 리스너 추가
    go.addEventListener('click', handleStonePlacement);
}

// 보드에 돌을 놓는 동작 처리
function handleStonePlacement(e) {
    const target = e.target; // 클릭된 요소 가져오기
    if (target.tagName !== 'TD') return; // 셀 외부를 클릭한 경우 무시

    const [row, col] = target.id.split('-').map(Number); // 셀 ID에서 행과 열 추출

    // 셀이 이미 차있으면 동작 중단
    if (boardState[row][col] !== null) {
        alert('이미 돌이 놓인 자리입니다!'); // 이미 돌이 놓인 경우 경고 표시
        return;
    }

    // 논리 상태에 돌 배치
    boardState[row][col] = currentPlayer;

    // 시각적으로 돌 추가
    target.classList.add(
        currentPlayer === 'black' ? 'black-stone' : 'white-stone'
    );

    // 현재 놓인 돌로 인해 승리 여부 확인
    if (checkWin(row, col, currentPlayer)) {
        setTimeout(() => {
            alert(`${currentPlayer === 'black' ? '흑' : '백'}이 승리했습니다!`); // 승리한 플레이어를 알림
            initializeBoard(); // 승리 후 보드 초기화
        }, 100); // 사용자 경험을 위해 약간의 딜레이 추가
        return;
    }

    // 다음 플레이어로 전환
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
}

// 승리 조건 확인
function checkWin(row, col, player) {
    // 4가지 방향을 정의 (가로, 세로, 대각선 ↘, 대각선 ↙)
    const directions = [
        [0, 1], // 가로 (→)
        [1, 0], // 세로 (↓)
        [1, 1], // 대각선 (↘)
        [1, -1], // 대각선 (↙)
    ];

    // 각 방향 확인
    for (const [dx, dy] of directions) {
        let count = 1; // 현재 놓인 돌 포함

        // 앞쪽 방향으로 연속된 돌 개수 계산
        count += countStones(row, col, dx, dy, player);

        // 뒤쪽 방향으로 연속된 돌 개수 계산
        count += countStones(row, col, -dx, -dy, player);

        // 5개 이상의 돌이 연속으로 있으면 승리
        if (count >= 5) return true;
    }

    return false; // 승리 조건을 충족하지 않음
}

// 특정 방향으로 연속된 돌 개수 계산
function countStones(row, col, dx, dy, player) {
    let count = 0; // 초기 개수는 0
    let x = row + dx; // 지정된 방향으로 다음 셀 시작
    let y = col + dy;

    // 지정된 방향으로 셀을 탐색
    while (
        x >= 0 && // 상단 경계 안에 있어야 함
        x < 17 && // 하단 경계 안에 있어야 함
        y >= 0 && // 좌측 경계 안에 있어야 함
        y < 17 && // 우측 경계 안에 있어야 함
        boardState[x][y] === player // 현재 플레이어의 돌인지 확인
    ) {
        count++; // 돌 개수 증가
        x += dx; // 지정된 방향으로 이동
        y += dy;
    }

    return count; // 해당 방향으로 연속된 돌 개수 반환
}
