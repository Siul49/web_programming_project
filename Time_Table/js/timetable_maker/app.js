import { Student } from './student.js';

let csvData = null;

document.getElementById("csvInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    Papa.parse(file, {
        complete: function(results) {
            csvData = results.data;
            alert("CSV 로딩 완료!");
        }
    });
});

document.getElementById("processBtn").addEventListener("click", function () {
    if (!csvData) {
        alert("먼저 CSV 파일을 업로드하세요.");
        return;
    }

    const row = 4;
    const col = 3;
    const unit = 2;
    const students = [];
    const map = new Map();

    for (const line of csvData) {
        const [name, personalNum, ...times] = line;
        if (!map.has(personalNum)) {
            map.set(personalNum, true);
            students.push(new Student(name, personalNum, times, col, row));
        }
    }

    const timeTable = Array.from({ length: row }, () => Array(col).fill(""));

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            students.sort((a, b) => a.selectCnt - b.selectCnt);

            const selected = [];
            let cnt = 0;

            for (let k = 0; k < students.length && cnt < unit; k++) {
                if (students[k].isPossible(i, j)) {
                    timeTable[i][j] += `${students[k].name}/${students[k].personalNum}, `;
                    selected.push(students[k].personalNum);
                    cnt++;
                }
            }

            for (const id of selected) {
                const idx = students.findIndex(s => s.personalNum === id);
                if (idx !== -1) students.splice(idx, 1);
            }

            if (timeTable[i][j] !== "") {
                for (const student of students) {
                    student.deleteTime(i, j);
                }
                timeTable[i][j] = timeTable[i][j].replace(/, $/, "");
            }
        }
    }

    const csvString = Papa.unparse(timeTable);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "schedule.csv");
});
