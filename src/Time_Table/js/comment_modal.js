let step = 1;

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    step = 0;
    updateModalText();
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}

function nextStep() {
    step++;
    updateModalText();
}

function lastStep() {
    step--;
    updateModalText();
}

function updateModalText() {
    const text = document.getElementById("modal-ContentText");
    const last_btn = document.querySelector(".last-button");
    const next_btn = document.querySelector(".next-button");

    if (step === 0) {
        text.textContent = "허헝~";
        last_btn.style.display = "none";
        next_btn.textContent = "다음으로";
    } else if (step === 1) {
        text.textContent = "안녕하세융~~";
        last_btn.style.display = "inline-block";
        next_btn.textContent = "다음으로";
    } else if (step === 2) {
        text.textContent = "저희 3조의 타임테이블 웹사이트, 어떠셨나요~?";
    } else if (step === 3) {
        text.textContent = "여러분 어때요 우리꺼 잘만들었죠~";
    } else if (step === 4) {
        text.textContent = "우하하하항 종강까지 파이팅 해보아용~";
    } else if (step === 5) {
        text.textContent = "우리 모두 A+를 향해서~ 빠잉";
        next_btn.textContent = "끝내기";
    } else {
        closeModal();
    }
}