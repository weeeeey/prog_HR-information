export default function CardsContainer({ $app, initialstate, onClick }) {
    this.state = initialstate;
    this.$target = document.createElement('div');
    this.$target.id = 'cards_container';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const { personals, cardStatus } = this.state;

        this.$target.innerHTML = ``;
        personals.forEach((info, idx) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = cardStatus[idx].status;
            cardDiv.setAttribute('data-id', idx);
            cardDiv.innerHTML = `
                        <div class="card_plane card_plane--front">${info.nickname}</div>
                        <div class="card_plane card_plane--back">${info.mbti}</div>
                    `;
            this.$target.appendChild(cardDiv);
        });
    };
    this.$target.addEventListener('click', (e) => {
        let cardDiv = e.target.closest('.card');
        if (!cardDiv) {
            cardDiv = e.target.closest('.card is-flipped');
            if (!cardDiv) return;
        }

        const dataId = cardDiv.getAttribute('data-id');
        const { cardStatus } = this.state;
        const newStatus = {
            ...cardStatus,
        };
        newStatus[dataId].status =
            newStatus[dataId].status === 'card' ? 'card is-flipped' : 'card';

        window.localStorage.setItem('cardStatus', JSON.stringify(newStatus));
        onClick();
    });
    this.render();
}
