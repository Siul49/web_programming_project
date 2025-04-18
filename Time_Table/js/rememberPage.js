// 페이지가 로드될 때 URL에서 값 불러오기
window.addEventListener('DOMContentLoaded', loadStatesFromURL);

// 현재 상태(숫자 및 슬라이더 값)를 URL에 저장하는 함수
function saveStateToUrl() {
    const digitsStr = digits.join(','); // 숫자 배열을 문자열로 변환 (예: "1,2,3,4,5,6,7")
    const params = new URLSearchParams(window.location.search); // 현재 URL의 쿼리 파라미터 불러오기

    params.set('digits', digitsStr);      // 숫자 값 저장
    params.set('sliderMin', currentMin);  // 슬라이더 최소값 저장
    params.set('sliderMax', currentMax);  // 슬라이더 최대값 저장

    // 새 URL 구성 및 브라우저 주소창에 반영 (페이지 새로고침 없이)
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newURL);
}

// URL에서 상태(숫자 및 슬라이더 값)를 불러오는 함수
function loadStatesFromURL() {
    const params = new URLSearchParams(window.location.search); // URL 쿼리 파라미터 불러오기
    const digitsStr = params.get('digits');                     // 저장된 숫자 문자열
    const minParam = parseInt(params.get('sliderMin'), 10);     // 저장된 슬라이더 최소값
    const maxParam = parseInt(params.get('sliderMax'), 10);     // 저장된 슬라이더 최대값

    // 숫자 배열이 있다면, 유효성 검사 후 적용
    if (digitsStr) {
        const arr = digitsStr.split(',').map(x => parseInt(x, 10)); // 문자열을 숫자 배열로 변환
        if (arr.length === digits.length && arr.every(x => !isNaN(x))) {
            arr.forEach((v, i) => digits[i] = v); // 현재 숫자 배열에 반영
            updateDigitsUI(); // UI 업데이트
        }
    }

    // 슬라이더 값이 숫자라면 적용
    if (!isNaN(minParam)) currentMin = minParam;
    if (!isNaN(maxParam)) currentMax = maxParam;
}
