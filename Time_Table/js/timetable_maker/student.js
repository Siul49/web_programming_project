export class Student {
    constructor(name, personalNum, possibleTime, column, row) {
        this.name = name;
        this.personalNum = personalNum;
        this.column = column;
        this.row = row;
        this.selectCnt = 0;
        this.possibleTable = Array.from({ length: row }, () => Array(column).fill(false));

        let cnt = 0;
        for (const s of possibleTime) {
            if (s.length > 7) {
                const tokens = s.split(/,\s*/);
                for (let i = 0; i < column; i++) {
                    try {
                        const day = this.convertDay(tokens[i]);
                        this.possibleTable[cnt][day] = true;
                        this.selectCnt++;
                    } catch (e) {}
                }
            } else {
                const day = this.convertDay(s);
                this.possibleTable[cnt][day] = true;
                this.selectCnt++;
            }
            cnt++;
        }
    }

    convertDay(token) {
        switch (token.trim()) {
            case "3/10(월)": return 0;
            case "3/11(화)": return 1;
            case "3/12(수)": return 2;
            default: return 0;
        }
    }

    isPossible(row, col) {
        return this.possibleTable[row][col];
    }

    deleteTime(row, col) {
        if (this.possibleTable[row][col]) {
            this.possibleTable[row][col] = false;
            this.selectCnt--;
        }
    }
}
