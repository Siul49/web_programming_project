// Student 클래스를 import
import { Student } from './student.js';

let csvData = null; // CSV 데이터를 저장할 변수

// CSV 파일 업로드(input type="file") 이벤트 리스너 등록
document.getElementById("csvInput").addEventListener("change", function (e) {
    const file = e.target.files[0]; // 업로드된 파일 가져오기
    Papa.parse(file, { // PapaParse 라이브러리로 CSV 파일 파싱
        complete: function(results) {
            csvData = results.data; // 파싱된 데이터를 csvData에 저장
            alert("CSV 로딩 완료!"); // 사용자에게 알림
        }
    });
});

// "processBtn" 버튼 클릭 시 시간표 배정 및 결과 다운로드
document.getElementById("processBtn").addEventListener("click", function () {
    if (!csvData) { // CSV 데이터가 없으면
        alert("먼저 CSV 파일을 업로드하세요.");
        return;
    }

    // 시간표의 행(row), 열(col), 한 칸에 배정할 학생 수(unit) 설정
    const row = 4;
    const col = 3;
    const unit = 18;
    const students = []; // Student 객체들을 담을 배열
    const map = new Map(); // 중복 학생(개인번호) 방지를 위한 Map

    // CSV 데이터에서 학생 정보를 추출하여 Student 객체 생성
    for (const line of csvData) {
        const [name, personalNum, ...times] = line; // 이름, 개인번호, 가능한 시간대 분리
        if (!map.has(personalNum)) { // 중복 방지
            map.set(personalNum, true);
            students.push(new Student(name, personalNum, times, col, row));
        }
    }

    // 빈 시간표 2차원 배열 생성 (row x col)
    const timeTable = Array.from({ length: row }, () => Array(col).fill(""));

    // 시간표 각 칸에 학생 배정
    for (let i = 0; i < row; i++) { // 행(시간대) 순회
        for (let j = 0; j < col; j++) { // 열(요일 등) 순회
            // 가능한 시간 개수가 적은 학생부터 우선 배정
            students.sort((a, b) => a.selectCnt - b.selectCnt);

            const selected = []; // 이번 칸에 배정된 학생들의 개인번호 저장
            let cnt = 0; // 현재 배정된 학생 수

            // 학생 리스트를 순회하며 해당 칸에 배정
            for (let k = 0; k < students.length && cnt < unit; k++) {
                if (students[k].isPossible(i, j)) { // 해당 칸이 가능한 학생이라면
                    timeTable[i][j] += `${students[k].name}/${students[k].personalNum}, `;
                    selected.push(students[k].personalNum); // 배정된 학생 기록
                    cnt++;
                }
            }

            // 배정된 학생은 students 배열에서 제거 (중복 배정 방지)
            for (const id of selected) {
                const idx = students.findIndex(s => s.personalNum === id);
                if (idx !== -1) students.splice(idx, 1);
            }

            // 해당 칸에 학생이 배정되었으면, 남은 학생들의 해당 시간 가능 여부를 false로 변경
            if (timeTable[i][j] !== "") {
                for (const student of students) {
                    student.deleteTime(i, j);
                }
                // 마지막에 붙은 ", " 제거
                timeTable[i][j] = timeTable[i][j].replace(/, $/, "");
            }
        }
    }

    // 완성된 시간표를 CSV 문자열로 변환
    const csvString = Papa.unparse(timeTable);
    // Blob 객체로 변환 후 파일로 저장 (FileSaver.js의 saveAs 함수 사용)
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "schedule.csv");
});
