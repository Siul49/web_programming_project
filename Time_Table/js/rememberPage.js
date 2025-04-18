// �������� �ε�� �� URL���� �� �ҷ�����
window.addEventListener('DOMContentLoaded', loadStatesFromURL);

// ���� ����(���� �� �����̴� ��)�� URL�� �����ϴ� �Լ�
function saveStateToUrl() {
    const digitsStr = digits.join(','); // ���� �迭�� ���ڿ��� ��ȯ (��: "1,2,3,4,5,6,7")
    const params = new URLSearchParams(window.location.search); // ���� URL�� ���� �Ķ���� �ҷ�����

    params.set('digits', digitsStr);      // ���� �� ����
    params.set('sliderMin', currentMin);  // �����̴� �ּҰ� ����
    params.set('sliderMax', currentMax);  // �����̴� �ִ밪 ����

    // �� URL ���� �� ������ �ּ�â�� �ݿ� (������ ���ΰ�ħ ����)
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newURL);
}

// URL���� ����(���� �� �����̴� ��)�� �ҷ����� �Լ�
function loadStatesFromURL() {
    const params = new URLSearchParams(window.location.search); // URL ���� �Ķ���� �ҷ�����
    const digitsStr = params.get('digits');                     // ����� ���� ���ڿ�
    const minParam = parseInt(params.get('sliderMin'), 10);     // ����� �����̴� �ּҰ�
    const maxParam = parseInt(params.get('sliderMax'), 10);     // ����� �����̴� �ִ밪

    // ���� �迭�� �ִٸ�, ��ȿ�� �˻� �� ����
    if (digitsStr) {
        const arr = digitsStr.split(',').map(x => parseInt(x, 10)); // ���ڿ��� ���� �迭�� ��ȯ
        if (arr.length === digits.length && arr.every(x => !isNaN(x))) {
            arr.forEach((v, i) => digits[i] = v); // ���� ���� �迭�� �ݿ�
            updateDigitsUI(); // UI ������Ʈ
        }
    }

    // �����̴� ���� ���ڶ�� ����
    if (!isNaN(minParam)) currentMin = minParam;
    if (!isNaN(maxParam)) currentMax = maxParam;
}
