// 페이지 로드 시 URL에서 상태(숫자 배열, 슬라이더 값 등) 불러오기
window.addEventListener('DOMContentLoaded', loadStatesFromURL);

/**
 * 현재 상태(숫자 배열, 슬라이더 최소/최대값)를 URL에 저장하는 함수
 */
function saveStateToUrl() {
    const digitsStr = digits.join(','); // 숫자 배열을 문자열로 변환 (예: "1,2,3,4,5,6,7")
    const params = new URLSearchParams(window.location.search); // 현재 URL의 쿼리 파라미터 읽기

    params.set('digits', digitsStr);      // 숫자 배열 저장
    params.set('sliderMin', currentMin);  // 슬라이더 최소값 저장
    params.set('sliderMax', currentMax);  // 슬라이더 최대값 저장

    // 새 URL 생성 후, 주소창을 변경(페이지 새로고침 없이)
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newURL);
}

/**
 * URL에서 상태(숫자 배열, 슬라이더 최소/최대값)를 불러오는 함수
 */
function loadStatesFromURL() {
    const params = new URLSearchParams(window.location.search); // URL의 쿼리 파라미터 읽기
    const digitsStr = params.get('digits');                     // 숫자 배열 문자열
    const minParam = parseInt(params.get('sliderMin'), 10);     // 슬라이더 최소값
    const maxParam = parseInt(params.get('sliderMax'), 10);     // 슬라이더 최대값

    // 숫자 배열이 존재하면 유효성 검사 후 적용
    if (digitsStr) {
        const arr = digitsStr.split(',').map(x => parseInt(x, 10)); // 문자열 → 숫자 배열 변환
        if (arr.length === digits.length && arr.every(x => !isNaN(x))) {
            arr.forEach((v, i) => digits[i] = v); // 기존 배열에 값 복사
            updateDigitsUI(); // UI 갱신
        }
    }

    // 슬라이더 최소/최대값이 유효하면 적용
    if (!isNaN(minParam)) currentMin = minParam;
    if (!isNaN(maxParam)) currentMax = maxParam;
}
