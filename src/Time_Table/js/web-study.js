let step = 0;

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    step = 0;
    updateModalVisibility();
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal-sub").classList("hidden");
    document.body.classList.remove("overflow-hidden");
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
        document.getElementById("submodal-ContentText").innerHTML = currentStep.text;
    }
}

function updateModalText() {
    const text = document.getElementById("modal-ContentText"); //메인 텍스트
    const code_modal = document.getElementById("modal-Code") //코드 영역 on/off
    const text_code = code_modal.querySelector("code");
    const last_btn = document.querySelector(".last-button"); //이전 버튼
    const next_btn_text = document.querySelector(".next-button"); //다음 버튼

    const currentStep = steps[step];
    text.innerHTML = currentStep.text;

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
        text: "안녕하세요!" +
            "<br>지금부터 함께 이 페이지의 구성 요소를 살펴보면서" +
            "<br>HTML은 어떤 구조로 이루어져 있는지," +
            "<br>CSS는 어떻게 디자인을 적용하는지 같이 배워볼 거예요!",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "먼저 간단하게 html과 css에 대해" +
            "<br>간단하게 설명해 드릴게요!",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "HTML은" +
            "<br>Hyper Text MarkUp Language의 약자로," +
            "<br>웹페이지의 뼈대를 구성하는 마크업 언어예요!",
        code: "",  // 코드 없음
    },{
        type: "modal-sub",
        text: "이렇게 웹페이지의 기본 뼈대를 구성하는 거예요!" +
            "<br>(디자인은 CSS가 담당해요)"
    },{
        type: "modal",
        text: "CSS는" +
            "<br>Cascading Style Sheets의 약자로," +
            "<br>HTML로 만든 뼈대에 구체적인 레이아웃을" +
            "<br>잡아주는 기능을 해요!",
        code: "",  // 코드 없음
    },{
        type: "modal-sub",
        text: "어떤 폰트를 사용할지",
    },{
        type: "modal-sub",
        text: "버튼의 종류 및 색상을 어떻게 할지",
    },{
        type: "modal-sub",
        text: "입력창들의 위치 및 크기 등을 어떻게 배치할지" +
            "<br>등을 설정하여 웹페이지를 꾸며줘요!",
    },{
        type: "modal",
        text: "먼저 HTML에 대해 알려드릴게요!",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "HTML은 태그를 이용해서 구조를 만드는 언어예요!",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "<태그>란," +
            "<br>HTML을 기술하기 위해 사용하는 명령어의 집합이에요.",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "아직 잘 와닿지 않으시죠?" +
            "<br>이제부터 HTML의 핵심 태그들을 알려드릴게요!",
        code: "",  // 코드 없음
    },{
        type: "modal",
        text: "먼저," +
            "<br>HTML의 기본 구조를" +
            "<br>이루는 태그예요!" +
            "<br>" +
            "<br>&lt;html&gt; : 전체 HTML 문서" +
            "<br>&lt;head&gt; : 제목, 스타일 등 설정" +
            "<br>&lt;body&gt; : 화면에 보이는 내용",
        code: "&lt;!DOCTYPE html&gt;<br>" +
            "&lt;html lang=\"ko\"&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;head&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta charset=\"UTF-8\"&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;문서 제목&lt;/title&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;/head&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;body&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;안녕하세요!&lt;/h1&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;이것은 HTML 기본 구조 예시입니다.&lt;/p&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;/body&gt;<br>\n" +
            "&lt;/html&gt;\n",  // 코드 없음
    },{
        type: "modal",
        text: "구조를 다루는 다른 태그가 하나 더 있는데" +
            "<br>바로 &lt;div&gt; 태그예요!</div>" +
            "<br>" +
            "<br>&lt;div&gt; : 구역을 나누는 블록" +
            "<br>" +
            "<br>쉽게 말해 '구역 나누기 박스'라고" +
            "<br>생각하시면 돼요!",
        code: "&lt;div class=\"container\"&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;div class=\"card\"&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;공지 1&lt;/h3&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;오늘은 점심이 무료입니다.&lt;/p&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;/div&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;div class=\"card\"&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3&gt;공지 2&lt;/h3&gt;<br>\n" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;신입생 환영회는 금요일입니다.&lt;/p&gt;<br>\n" +
            "&nbsp;&nbsp;&lt;/div&gt;<br>\n" +
            "&lt;/div&gt;",  // 코드 없음
    },{
        type: "modal-sub",
        text: "&lt;div&gt; 태그를 사용하면 이런 식으로 기능에 따라" +
            "<br>그룹을 지어 개별 블록으로 나눌 수 있어요!!",
    },{
        type: "modal-sub",
        text: "아까 HTML은 뼈대를 구성하는 언어라고 했는데," +
            "<br>주로 &lt;div&gt; 태그를 활용해서 그룹을 지어" +
            "<br>웹페이지 뼈대를 구성해요!",
    },{
        type: "modal",
        text: "HTML에서 글을 작성할 수 있는" +
            "<br>&lt;p&gt; 태그에 대해 알려드릴게요!" +
            "<br>&lt;p&gt; : 문단, 일반 텍스트 작성" +
            "<br>웹페이지에서 일반 텍스트를 쓸 때" +
            "<br>가장 기본적으로 쓰이는 태그예요!",
        code: "&lt;p&gt;이건 하나의 문단이에요.&lt;/p&gt;<br>\n",

    },{
        type: "modal-sub",
        text: "이런 텍스트를 작성할 때 쓰여요!" +
            "<br>(제목을 나타내는 h1~h6 태그도 있어요!)",
    },{
        type: "modal",
        text: "&lt;input&gt;은" +
            "<br>사용자에게 입력을 받는 필드예요." +
            "<br>숫자만 입력받고 싶다면" +
            "<br>oninput 속성을 써요 :)",
        code: "&lt;input oninput=\"this.value = this.value.replace(/[^0-9]/g, '')\"&gt;<br>",
    },{
        type: "modal-sub",
        text: "입력창들의 위치 및 크기 등을 어떻게 배치할지 등을" +
            "<br>설정하여 웹페이지를 꾸며줘요!",
    },{
        type: "modal",
        text: "&lt;a&gt;는 anchor의 약자로," +
            "<br>웹 페이지에서 다른 페이지로 이동하거나," +
            "<br>파일을 다운로드, 이메일 전송," +
            "<br>같은 페이지 내에서 특정 위치로 이동 등" +
            "<br>다양한 작업을 할 수 있게 해준답니다." +
            "<br>여기서 쓰이는 href 속성은 하이퍼링크가" +
            "<br>연결되는 주소를 의미해요.",
        code: "&lt;a href=&quot;page2.html&quot;&gt;다음 페이지로 이동&lt;/a&gt;<br>",
    },{
        type: "modal-sub",
        text: "이렇게 정적페이지 창에서 동적페이지 창으로 이동하거나",
    },{
        type: "modal-sub",
        text: "다음으로 버튼을 눌렀을 때" +
            "<br>다음 페이지로 이동할 수 있게 해줘요.",
    },{
        type: "modal",
        text: "HTML 구조를 이해하기 위한" +
            "<br>핵심 개념으로" +
            "<br>부모와 자식 개념이 있어요!" +
            "<br>태그 안에 태그가 들어가는 구조가" +
            "<br>바로 부모-자식 관계!" +
            "<br>" +
            "<br>여기서  div는 부모, button와 p는 자식!" +
            "<br>이 개념은 이따 CSS에서도" +
            "<br>등장하니까 잘 기억해두세요!",
        code: "&lt;div&gt;<br>" +
            "  &lt;button&gt;클릭!&lt;/button&gt;<br>" +
            "  &lt;p&gt;위 버튼을 클릭하세요!&lt;/p&gt;<br>" +
            "&lt;/div&gt;<br>",
    },
];