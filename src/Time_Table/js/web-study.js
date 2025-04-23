let step = 0;

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modalStart").classList.add("overflow-hidden");
    step = 0;
    updateModalVisibility();
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal-sub").classList.add("hidden");
    document.getElementById("modalStart").classList.remove("overflow-hidden");
}

function nextStep() {
    if (step === steps.length - 1) { //마지막 단계면 모달 닫기
        closeModal();
        return;
    }
    step++;  // 단계 진행
    updateModalVisibility();  // 텍스트 업데이트
}

function lastStep() {
    step--;  // 단계 진행
    updateModalVisibility();  // 텍스트 업데이트
}

function updateModalVisibility() {
    const modal = document.getElementById("modal");
    const modalSub = document.getElementById("modal-sub");

    const currentStep = steps[step];

    // 공통 텍스트 설정
    if (currentStep.type === "modal") {
        modal.classList.remove("hidden");
        modalSub.classList.add("hidden");
        updateModalText();  // 큰 모달은 텍스트, 코드 등 업데이트
    } else if (currentStep.type === "modal-sub") {
        modal.classList.add("hidden");
        modalSub.classList.remove("hidden");
        document.getElementById("submodal-ContentText").textContent = currentStep.text;
    }
}

function updateModalText() {
    const text = document.getElementById("modal-ContentText"); //메인 텍스트
    const code_modal = document.getElementById("modal-Code") //코드 영역 on/off
    const text_code = code_modal.querySelector("code");
    const last_btn = document.querySelector(".last-button"); //이전 버튼
    const next_btn_text = document.querySelector(".next-button"); //다음 버튼

    const currentStep = steps[step];
    text.textContent=currentStep.text;

    //코드와 텍스트를 함게 출력
    if (currentStep.code.trim() !== "") { //코드가 있을 때
        code_modal.style.display = "block";
        text_code.innerHTML = currentStep.code;
        text_code.className = "language-html";
        hljs.highlightElement(text_code);

    } else { //코드가 없을 때
        code_modal.style.display = "none";
    }

    //이전 버튼과 다음 버튼 업데이트
    last_btn.style.display = step === 0 ? "none" : "inline-block";
    next_btn_text.textContent = step === steps.length -1 ? "끝내기" : "다음으로";
}

const steps = [
    {
        type: "modal",
        text: "허헝~",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "안녕하세요",
        code: "&lt;!DOCTYPE html&gt;\n&lt;html lang='ko'&gt;",  // 코드 있음
    },{
        type: "modal",
        text: "모달 창을 한 번 만들어봤어용",
        code: "&lt;head&gt;\n  &lt;meta charset='UTF-8'&gt;\n  &lt;title&gt;튜토리얼&lt;/title&gt;\n&lt;/head&gt;",  // 코드 있음
    },{
        type: "modal-sub",
        text: "작은 모달 1번",
    },{
        type: "modal",
        text: "쓸지 말지는 잘 모르겠으나...",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "A+을 향해서 빠읭~",
        code: "&lt;p&gt;HTML은 HyperText Markup Language의 줄임말이에요&lt;/p&gt;",  // 코드 있음
    },
];