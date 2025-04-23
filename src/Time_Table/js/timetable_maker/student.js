// Student 클래스를 정의하고, 외부에서 import/export로 사용할 수 있게 함
export class Student {
    // 생성자: 학생의 이름, 개인번호, 가능한 시간 목록, 열(column), 행(row) 정보를 받아 초기화
    constructor(name, personalNum, possibleTime, col, row) {
        this.name = name;                  // 학생 이름
        this.personalNum = personalNum;    // 학생 개인 번호
        this.col = col;              // 시간표의 열(요일 등)
        this.row = row;                    // 시간표의 행(시간대 등)
        this.selectCnt = 0;                // 가능한 시간 개수(선택된 시간 수)
        // 가능한 시간표를 2차원 배열로 초기화 (모두 false로 시작)
        this.possibleTable = Array.from({ length: row }, () => Array(col).fill(false));

        let cnt = 0; // 현재 처리 중인 행(시간대) 인덱스
        // possibleTime 배열을 순회하며 가능한 시간대를 possibleTable에 표시
        for (const s of possibleTime) {
            // 시간 문자열이 7글자보다 길면(여러 요일이 한 줄에 있을 때) ex) 3/10(월)
            if (s.length > 7) {
                // 쉼표(,)로 분리해서 각 요일별로 처리
                const tokens = s.split(/,\s*/);
                for (let i = 0; i < col; i++) {
                    try {
                        const day = this.convertDay(tokens[i]); // 요일 문자열을 숫자로 변환
                        this.possibleTable[cnt][day] = true;    // 해당 시간대, 요일에 true 표시
                        this.selectCnt++;                       // 가능한 시간 개수 증가
                    } catch (e) {}
                }
            } else {
                // 한 개의 요일만 있는 경우
                const day = this.convertDay(s);                 // 요일 문자열을 숫자로 변환
                this.possibleTable[cnt][day] = true;            // 해당 시간대, 요일에 true 표시
                this.selectCnt++;                               // 가능한 시간 개수 증가
            }
            cnt++; // 다음 시간대(행)로 이동
        }
    }

    // 요일 문자열을 숫자로 변환하는 메서드 (0:월, 1:화, 2:수)
    convertDay(token) {
        switch (token.trim()) {
            case "3/10(월)": return 0;
            case "3/11(화)": return 1;
            case "3/12(수)": return 2;
            default: return 0; // 알 수 없는 경우 월요일로 처리
        }
    }

    // 해당 시간(row, col)이 가능한지 확인하는 메서드
    isPossible(row, col) {
        return this.possibleTable[row][col];
    }

    // 해당 시간(row, col)을 불가능으로 바꾸고, 가능한 시간 개수를 감소시키는 메서드
    deleteTime(row, col) {
        if (this.possibleTable[row][col]) {
            this.possibleTable[row][col] = false;
            this.selectCnt--;
        }
    }
}
