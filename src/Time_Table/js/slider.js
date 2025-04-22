// 슬라이더 전체 시간 범위(분 단위)
const minTime = 0; // 00:00 (가장 이른 시간)
const maxTime = 24 * 60; // 24:00 (가장 늦은 시간, 분 단위)

let currentMin = minTime; // 현재 선택된 최소 시간(분)
let currentMax = maxTime; // 현재 선택된 최대 시간(분)

let trackWidth = 0; // 슬라이더 트랙의 너비(px)

// DOM 요소 가져오기
const track = document.getElementById("sliderTrack");
const sliderRange = document.getElementById("sliderRange");
const thumbMin = document.getElementById("sliderThumbMin");
const thumbMax = document.getElementById("sliderThumbMax");
const labelMin = document.getElementById("sliderMinLabel");
const labelMax = document.getElementById("sliderMaxLabel");

// 분(minute)을 "HH:MM" 형태의 문자열로 변환하는 함수
function timeToStr(mins) {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
}

// 시간(분 단위)을 트랙 상의 px 위치로 변환
function valueToPx(val) {
    return ((val - minTime) / (maxTime - minTime)) * trackWidth;
}

// px 위치를 시간(분 단위) 값으로 변환 (INTERVAL 단위로 반올림)
function pxToValue(px) {
    // px 위치를 전체 트랙 비율로 환산 → 시간(분)으로 변환 → intervalValue 단위로 반올림
    let v = Math.round((px / trackWidth) * (maxTime - minTime) / intervalValue) * intervalValue + minTime;
    // minTime ~ maxTime 범위로 제한
    v = Math.max(minTime, Math.min(v, maxTime));
    return v;
}

// 슬라이더 UI를 현재 값에 맞게 갱신하는 함수
function updateSliderUI() {
    const minPx = valueToPx(currentMin);
    const maxPx = valueToPx(currentMax);

    const thumbWidth = thumbMin.offsetWidth;

    // 슬라이더 핸들(thumb) 위치 조정
    thumbMin.style.left = `${minPx - thumbWidth / 2}px`;
    thumbMax.style.left = `${maxPx - thumbWidth / 2}px`;

    // 선택된 범위 표시 바 위치와 길이 조정
    sliderRange.style.left = `${minPx}px`;
    sliderRange.style.width = `${maxPx - minPx - 9}px`; // -9는 핸들 두께 보정

    // 라벨에 현재 시간 표시
    labelMin.textContent = timeToStr(currentMin);
    labelMax.textContent = timeToStr(currentMax);
}

// 드래그 중인 핸들 정보 ("min" 또는 "max")
let dragging = null;

// 핸들 클릭(터치) 시 드래그 시작
function onDrag(e, type) {
    dragging = type; // "min" 또는 "max" 저장
    document.body.style.userSelect = "none"; // 드래그 중 텍스트 선택 방지
}

// 드래그 중 마우스/터치 이동 처리
function onMove(e) {
    if (!dragging) return;

    const rect = track.getBoundingClientRect();
    // 마우스 또는 터치 위치를 트랙 기준 px로 계산
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let val = pxToValue(x); // px 위치를 시간(분) 값으로 변환

    // 드래그 중인 핸들에 따라 값 갱신 (최소/최대값이 겹치지 않도록 보정)
    if (dragging === "min") {
        currentMin = Math.min(val, currentMax - intervalValue);
    } else if (dragging === "max") {
        currentMax = Math.max(val, currentMin + intervalValue);
    }

    updateSliderUI();
    saveStateToUrl();
}

// 드래그 종료 처리
function onUp() {
    dragging = null;
    document.body.style.userSelect = ""; // 텍스트 선택 가능 상태로 복구
}

// 핸들에 마우스/터치 이벤트 등록
thumbMin.addEventListener("mousedown", e => onDrag(e, "min"));
thumbMax.addEventListener("mousedown", e => onDrag(e, "max"));
thumbMin.addEventListener("touchstart", e => onDrag(e, "min"));
thumbMax.addEventListener("touchstart", e => onDrag(e, "max"));

document.addEventListener("mousemove", onMove);
document.addEventListener("touchmove", onMove);
document.addEventListener("mouseup", onUp);
document.addEventListener("touchend", onUp);

// 창 크기 변경 시 트랙 너비 재계산 및 UI 갱신
window.addEventListener("resize", () => {
    trackWidth = track.offsetWidth;
    updateSliderUI();
});

// DOMContentLoaded 시 트랙 너비 초기화, URL 상태 불러오기, UI 초기화
window.addEventListener('DOMContentLoaded', () => {
    trackWidth = track.offsetWidth;
    loadStatesFromURL();  // URL에서 상태 불러오기
    updateSliderUI();     // UI 초기화
});

// ------------------------------------------------------
// 슬라이더 간격(INTERVAL) 관련 UI 및 로직
// ------------------------------------------------------

// 선택 가능한 INTERVAL 값 목록(분 단위)
const INTERVAL_NUMBER = [5, 10, 15, 20, 30, 60];
let intervalIndex = 0; // 현재 INTERVAL_NUMBER의 인덱스
let intervalValue = INTERVAL_NUMBER[intervalIndex]; // 현재 선택된 INTERVAL 값(분)

const INTERVAL = document.getElementById('intervalNum');
const intervalDecBtn = document.getElementById('intervalDecBtn');
const intervalIncBtn = document.getElementById('intervalIncBtn');

// INTERVAL 값 변경 시 UI 및 슬라이더 갱신
function updateInterval(newInterval) {
    intervalValue = newInterval;
    INTERVAL.textContent = newInterval; // 화면에 표시
    updateSliderUI();
}

// INTERVAL 감소 버튼 클릭 시
intervalDecBtn.addEventListener('click', () => {
    intervalIndex = (intervalIndex - 1 + INTERVAL_NUMBER.length) % INTERVAL_NUMBER.length;
    updateInterval(INTERVAL_NUMBER[intervalIndex]);
});

// INTERVAL 증가 버튼 클릭 시
intervalIncBtn.addEventListener('click', () => {
    intervalIndex = (intervalIndex + 1) % INTERVAL_NUMBER.length;
    updateInterval(INTERVAL_NUMBER[intervalIndex]);
});

// pxToValue 함수에서 intervalValue를 사용하여,
// 슬라이더 값이 intervalValue 단위로만 변경되도록 처리합니다.
