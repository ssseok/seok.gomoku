// 오목판 생성 함수
export function createCheckerboard(table, starPoints) {
    table.innerHTML = '';
    for (let i = 0; i < 18; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 18; j++) {
            const td = document.createElement('td');
            td.setAttribute('class', 'square');

            // 화점 위치에 점 추가
            if (starPoints.some(([x, y]) => x === i && y === j)) {
                const point = document.createElement('div');
                point.setAttribute('class', 'star-point');
                td.appendChild(point);
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

// 돌이 놓일 판 생성 함수
export function createPlacementBoard(go) {
    go.innerHTML = '';
    for (let i = 0; i < 17; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 17; j++) {
            const td = document.createElement('td');
            td.setAttribute('id', `${i}-${j}`);
            tr.appendChild(td);
        }
        go.appendChild(tr);
    }
}
