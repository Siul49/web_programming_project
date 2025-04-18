// �����̴� ���� ���� ������
const minTime = 0; // 00:00 (�� ����)
const maxTime = 24 * 60; // 24:00 (�� ����)

let currentMin = minTime; // ���� ���õ� �ּ� �ð�
let currentMax = maxTime; // ���� ���õ� �ִ� �ð�

let trackWidth = 0; // �����̴� Ʈ���� �ʺ� (px)

// DOM ��ҵ�
const track = document.getElementById("sliderTrack");
const sliderRange = document.getElementById("sliderRange");
const thumbMin = document.getElementById("sliderThumbMin");
const thumbMax = document.getElementById("sliderThumbMax");
const labelMin = document.getElementById("sliderMinLabel");
const labelMax = document.getElementById("sliderMaxLabel");

// ��(minute)�� HH:MM ������ ���ڿ��� ��ȯ
function timeToStr(mins) {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
}

// �ð� ���� px ��ġ�� ��ȯ
function valueToPx(val) {
    return ((val - minTime) / (maxTime - minTime)) * trackWidth;
}

// px ��ġ�� �ð� ������ ��ȯ (INTERVAL ������ ����)
function pxToValue(px) {
    let v = Math.round((px / trackWidth) * (maxTime - minTime) / intervalValue) * intervalValue + minTime;
    v = Math.max(minTime, Math.min(v, maxTime));
    return v;
}


// �����̴� UI ������Ʈ (��ġ�� �� �ݿ�)
function updateSliderUI() {
    const minPx = valueToPx(currentMin);
    const maxPx = valueToPx(currentMax);

    const thumbWidth = thumbMin.offsetWidth;

    // �����̴� Ŀ�� ��ġ ����
    thumbMin.style.left = `${minPx - thumbWidth / 2}px`;
    thumbMax.style.left = `${maxPx - thumbWidth / 2}px`;

    // ���õ� ���� ǥ��
    sliderRange.style.left = `${minPx}px`;
    sliderRange.style.width = `${maxPx - minPx - 9}px`; // -9�� Ŀ�� ������

    // �� ������Ʈ
    labelMin.textContent = timeToStr(currentMin);
    labelMax.textContent = timeToStr(currentMax);
}

// �巡�� ���� ����
let dragging = null;

// Ŀ�� ���� �� �巡�� ����
function onDrag(e, type) {
    dragging = type; // "min" �Ǵ� "max"
    document.body.style.userSelect = "none"; // �巡�� �� �ؽ�Ʈ ���� ����
}

// �巡�� �� ���콺 �̵� ó��
function onMove(e) {
    if (!dragging) return;

    const rect = track.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let val = pxToValue(x); // ��ġ�� �ð� ������ ��ȯ

    // min �Ǵ� max �� ������Ʈ (���� ����)
    if (dragging === "min") {
        currentMin = Math.min(val, currentMax - intervalValue); // <- ���� ����
    } else if (dragging === "max") {
        currentMax = Math.max(val, currentMin + intervalValue); // <- ���� ����
    }

    updateSliderUI();
    saveStateToUrl();
}

// �巡�� ����
function onUp() {
    dragging = null;
    document.body.style.userSelect = ""; // �ٽ� �ؽ�Ʈ ���� �����ϰ�
}

// ���콺/��ġ �̺�Ʈ ���
thumbMin.addEventListener("mousedown", e => onDrag(e, "min"));
thumbMax.addEventListener("mousedown", e => onDrag(e, "max"));
thumbMin.addEventListener("touchstart", e => onDrag(e, "min"));
thumbMax.addEventListener("touchstart", e => onDrag(e, "max"));

document.addEventListener("mousemove", onMove);
document.addEventListener("touchmove", onMove);
document.addEventListener("mouseup", onUp);
document.addEventListener("touchend", onUp);

// â ũ�� ���� �� �����̴� ������
window.addEventListener("resize", () => {
    trackWidth = track.offsetWidth;
    updateSliderUI();
});

// DOM �ε� �� �ʱ� ����
window.addEventListener('DOMContentLoaded', () => {
    trackWidth = track.offsetWidth;
    loadStatesFromURL();  // URL ���� �ҷ�����
    updateSliderUI();     // UI �ʱ�ȭ
});

// ------------------------------------------------------
// �����̴� ����(INTERVAL) ������ ���� UI �� ����
// ------------------------------------------------------
// INTERVAL ���� ����
const INTERVAL_NUMBER = [5, 10, 15, 20, 30, 60];
let intervalIndex = 0; // ���� INTERVAL_NUMBER�� �ε���
let intervalValue = INTERVAL_NUMBER[intervalIndex]; // ���� ����� INTERVAL ��

const INTERVAL = document.getElementById('intervalNum');
const intervalDecBtn = document.getElementById('intervalDecBtn');
const intervalIncBtn = document.getElementById('intervalIncBtn');

// INTERVAL �� ���� �Լ�
function updateInterval(newInterval) {
    intervalValue = newInterval;
    INTERVAL.textContent = newInterval; // ȭ�鿡 ǥ��
    updateSliderUI();
}

// INTERVAL ���� ��ư Ŭ��
intervalDecBtn.addEventListener('click', () => {
    intervalIndex = (intervalIndex - 1 + INTERVAL_NUMBER.length) % INTERVAL_NUMBER.length;
    updateInterval(INTERVAL_NUMBER[intervalIndex]);
});

// INTERVAL ���� ��ư Ŭ��
intervalIncBtn.addEventListener('click', () => {
    intervalIndex = (intervalIndex + 1) % INTERVAL_NUMBER.length;
    updateInterval(INTERVAL_NUMBER[intervalIndex]);
});

// pxToValue �Լ����� intervalValue ���
