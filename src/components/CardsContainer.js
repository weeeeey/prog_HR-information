export default function CardsContainer({ $app, initialstate }) {
    this.state = initialstate;
    this.$target = document.createElement('div');
    this.$target.id = 'cards_container';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const { personals } = this.state;
        const cardStatus = JSON.parse(
            window.localStorage.getItem('cardStatus')
        );
        this.$target.innerHTML = `
            ${personals
                .map((info, idx) => {
                    const classes = cardStatus[idx].status;
                    return `
            <div data-id=${idx} class=${classes}>
                <div class="card_plane card_plane--front">${info.nickname}</div>
                <div class="card_plane card_plane--back">${info.mbti}</div>
            </div>       
            `;
                })
                .join('')}
        `;
    };
    this.$target.addEventListener('click', (e) => {
        const cardDiv = e.target.closest('.card');
        if (!cardDiv) return;

        const dataId = parseInt(cardDiv.getAttribute('data-id'));
        const { cardStatus } = this.state;
        const newStatus = cardStatus.map((info) => {
            if (info.idx === dataId) {
                info.status =
                    info.status === 'card' ? 'card is-flipped' : 'card';
            }
            return info;
        });
        console.log(newStatus);
        window.localStorage.setItem('cardStatus', JSON.stringify(newStatus));
        // if (cardDiv.classList.contains('is-flipped')) {
        //     cardDiv.classList.remove('is-flipped');
        // } else {
        //     cardDiv.classList.add('is-flipped');
        // }
    });
    this.render();
}
