export function getCardStatus() {
    return JSON.parse(window.localStorage.getItem('cardStatus'));
}
