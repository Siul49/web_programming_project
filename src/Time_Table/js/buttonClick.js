// 버튼에 scale-125 클래스를 잠깐 추가해 "튀는" 애니메이션 효과를 주는 함수
function bounceAnimation(el) {
    el.classList.add("scale-125"); // 확대 효과
    setTimeout(() => {
        el.classList.remove("scale-125"); // 150ms 후 원래 크기로 복귀
    }, 150);
}

const digits = [0, 0, 0, 0, 0, 0, 0]; // 7자리 숫자 배열(초기값 0)

// 각 자리의 숫자 증가/감소 버튼과 숫자 표시 span 요소를 가져옴
const digitsUpButtons = document.querySelectorAll('.digitUp');
const digitsDownButtons = document.querySelectorAll('.digitDown');
const digitSpans = [
    document.getElementById("totalPeople100"),
    document.getElementById("totalPeople10"),
    document.getElementById("totalPeople1"),
    document.getElementById("peoplePerTime"),
    document.getElementById("whatDay10"),
    document.getElementById("whatDay1"),
    document.getElementById("days")
];

// 화면에 숫자 갱신 및 unitNum 변수 갱신, 그리고 특정 URL로 이동(이 부분은 수정 필요)
function updateDigitsUI() {
    digits.forEach((d, i) => digitSpans[i].textContent = d); // 각 자리 숫자 업데이트
    localStorage.setItem('unit', digits[3]);
}

// 숫자 감소 버튼(아래 화살표)에 클릭 이벤트 등록
const downButtons = document.querySelectorAll(".digit-down-btn");
downButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        digits[index] = (digits[index] - 1 + 10) % 10; // 0~9로 순환 감소
        bounceAnimation(digitsDownButtons[index]);      // 애니메이션 효과
        updateDigitsUI();                               // UI 갱신
        saveStateToUrl();                               // 상태를 URL에 저장
    });
});

// 숫자 증가 버튼(위 화살표)에 클릭 이벤트 등록
const upButtons = document.querySelectorAll(".digit-up-btn");
upButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        digits[index] = (digits[index] + 1 + 10) % 10; // 0~9로 순환 증가
        bounceAnimation(digitsUpButtons[index]);       // 애니메이션 효과
        updateDigitsUI();                              // UI 갱신
        saveStateToUrl();                              // 상태를 URL에 저장
    });
});

updateDigitsUI(); // 페이지 로드 시 숫자 UI 초기화
