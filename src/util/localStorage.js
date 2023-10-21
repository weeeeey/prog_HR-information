export function getCardStatus() {
    return JSON.parse(window.localStorage.getItem('cardStatus'));
}

export function setCardStatus(newDataIdx) {
    const oldData = getCardStatus();
    if (!oldData) {
        return;
    }
    oldData[newDataIdx].status =
        oldData[newDataIdx].status === 'card' ? 'card is-flipped' : 'card';
    window.localStorage.setItem('cardStatus', JSON.stringify(oldData));
}
