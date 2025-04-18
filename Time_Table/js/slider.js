// 슬라이더 설정 관련 변수들
const minTime = 0; // 00:00 (분 단위)
const maxTime = 24 * 60; // 24:00 (분 단위)

let currentMin = minTime; // 현재 선택된 최소 시간
let currentMax = maxTime; // 현재 선택된 최대 시간

let trackWidth = 0; // 슬라이더 트랙의 너비 (px)

// DOM 요소들
const track = document.getElementById("sliderTrack");
const sliderRange = document.getElementById("sliderRange");
const thumbMin = document.getElementById("sliderThumbMin");
const thumbMax = document.getElementById("sliderThumbMax");
const labelMin = document.getElementById("sliderMinLabel");
const labelMax = document.getElementById("sliderMaxLabel");

// 분(minute)을 HH:MM 형식의 문자열로 변환
function timeToStr(mins) {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
}

// 시간 값을 px 위치로 변환
function valueToPx(val) {
    return ((val - minTime) / (maxTime - minTime)) * trackWidth;
}

// px 위치를 시간 값으로 변환 (INTERVAL 단위로 보정)
function pxToValue(px) {
    let v = Math.round((px / trackWidth) * (maxTime - minTime) / intervalValue) * intervalValue + minTime;
    v = Math.max(minTime, Math.min(v, maxTime));
    return v;
}


// 슬라이더 UI 업데이트 (위치와 라벨 반영)
function updateSliderUI() {
    const minPx = valueToPx(currentMin);
    const maxPx = valueToPx(currentMax);

    const thumbWidth = thumbMin.offsetWidth;

    // 슬라이더 커서 위치 조정
    thumbMin.style.left = `${minPx - thumbWidth / 2}px`;
    thumbMax.style.left = `${maxPx - thumbWidth / 2}px`;

    // 선택된 범위 표시
    sliderRange.style.left = `${minPx}px`;
    sliderRange.style.width = `${maxPx - minPx - 9}px`; // -9은 커서 보정용

    // 라벨 업데이트
    labelMin.textContent = timeToStr(currentMin);
    labelMax.textContent = timeToStr(currentMax);
}

// 드래그 상태 관리
let dragging = null;

// 커서 누를 때 드래그 시작
function onDrag(e, type) {
    dragging = type; // "min" 또는 "max"
    document.body.style.userSelect = "none"; // 드래그 중 텍스트 선택 방지
}

// 드래그 중 마우스 이동 처리
function onMove(e) {
    if (!dragging) return;

    const rect = track.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let val = pxToValue(x); // 위치를 시간 값으로 변환

    // min 또는 max 값 업데이트 (범위 보정)
    if (dragging === "min") {
        currentMin = Math.min(val, currentMax - intervalValue); // <- 여기 수정
    } else if (dragging === "max") {
        currentMax = Math.max(val, currentMin + intervalValue); // <- 여기 수정
    }

    updateSliderUI();
    saveStateToUrl();
}

// 드래그 종료
function onUp() {
    dragging = null;
    document.body.style.userSelect = ""; // 다시 텍스트 선택 가능하게
}

// 마우스/터치 이벤트 등록
thumbMin.addEventListener("mousedown", e => onDrag(e, "min"));
thumbMax.addEventListener("mousedown", e => onDrag(e, "max"));
thumbMin.addEventListener("touchstart", e => onDrag(e, "min"));
thumbMax.addEventListener("touchstart", e => onDrag(e, "max"));

document.addEventListener("mousemove", onMove);
document.addEventListener("touchmove", onMove);
document.addEventListener("mouseup", onUp);
document.addEventListener("touchend", onUp);

// 창 크기 변경 시 슬라이더 재조정
window.addEventListener("resize", () => {
    trackWidth = track.offsetWidth;
    updateSliderUI();
});

// DOM 로드 시 초기 설정
window.addEventListener('DOMContentLoaded', () => {
    trackWidth = track.offsetWidth;
    loadStatesFromURL();  // URL 상태 불러오기
    updateSliderUI();     // UI 초기화
});

// ------------------------------------------------------
// 슬라이더 간격(INTERVAL) 조절을 위한 UI 및 로직
// ------------------------------------------------------
// INTERVAL 관련 변수
const INTERVAL_NUMBER = [5, 10, 15, 20, 30, 60];
let intervalIndex = 0; // 현재 INTERVAL_NUMBER의 인덱스
let intervalValue = INTERVAL_NUMBER[intervalIndex]; // 실제 사용할 INTERVAL 값

const INTERVAL = document.getElementById('intervalNum');
const intervalDecBtn = document.getElementById('intervalDecBtn');
const intervalIncBtn = document.getElementById('intervalIncBtn');

// INTERVAL 값 적용 함수
function updateInterval(newInterval) {
    intervalValue = newInterval;
    INTERVAL.textContent = newInterval; // 화면에 표시
    updateSliderUI();
}

// INTERVAL 감소 버튼 클릭
intervalDecBtn.addEventListener('click', () => {
    intervalIndex = (intervalIndex - 1 + INTERVAL_NUMBER.length) % INTERVAL_NUMBER.length;
    updateInterval(INTERVAL_NUMBER[intervalIndex]);
});

// INTERVAL 증가 버튼 클릭
intervalIncBtn.addEventListener('click', () => {
    intervalIndex = (intervalIndex + 1) % INTERVAL_NUMBER.length;
    updateInterval(INTERVAL_NUMBER[intervalIndex]);
});

// pxToValue 함수에서 intervalValue 사용
