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
        text.textContent = "모달 창을 한 번 만들어봤어융";
    } else if (step === 3) {
        text.textContent = "쓸지 말지는 잘 모르겠으나 괜찮나용?";
    } else if (step === 4) {
        text.textContent = "그냥... 그렇다구용... 2주 가량 남았는데 파이팅 해보아용~";
    } else if (step === 5) {
        text.textContent = "A+를 향해서~ 빠잉";
        next_btn.textContent = "끝내기";
    } else {
        closeModal();
    }
}