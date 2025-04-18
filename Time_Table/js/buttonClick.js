    function bounceAnimation(el) {
        el.classList.add("scale-125"); // 커짐
        setTimeout(() => {
        el.classList.remove("scale-125"); // 원래대로
    }, 150);
    }

    const digits = [0, 0, 0, 0, 0, 0, 0]; // 초기값
    const digitsUpButtons = document.querySelectorAll('.digitUp');
    const digitsDownButtons = document.querySelectorAll('.digitDown');
    const digitSpans = [
    document.getElementById("digit0"),
    document.getElementById("digit1"),
    document.getElementById("digit2"),
    document.getElementById("digit3"),
    document.getElementById("digit4"),
    document.getElementById("digit5"),
    document.getElementById("digit6")
    ];

    function updateDigitsUI() {
        digits.forEach((d, i) => digitSpans[i].textContent = d);
    }

    // 버튼과 연결
    const downButtons = document.querySelectorAll(".digit-down-btn");
    downButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            digits[index] = (digits[index] - 1 + 10) % 10;
            bounceAnimation(digitsDownButtons[index]);
            updateDigitsUI();

            saveStateToUrl();
        });
    });

    const upButtons = document.querySelectorAll(".digit-up-btn");
    upButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            digits[index] = (digits[index] + 1 + 10) % 10;
            bounceAnimation(digitsUpButtons[index]);
            updateDigitsUI();

            saveStateToUrl();
        });
    });

    updateDigitsUI(); // 초기화
