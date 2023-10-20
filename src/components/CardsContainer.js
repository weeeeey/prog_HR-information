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
        this.$target.innerHTML = `
            ${this.state
                .map(
                    (info, idx) => `
            <div data-id=${idx} class="card">
                <div class="card_plane card_plane--front">${info.nickname}</div>
                <div class="card_plane card_plane--back">${info.mbti}</div>
            </div>       
            `
                )
                .join('')}
        `;
    };
    this.$target.addEventListener('click', (e) => {
        const cardDiv = e.target.closest('.card');
        if (!cardDiv) return;
        const bool = JSON.parse(window.localStorage.getItem('cardStatus'));

        if (cardDiv.classList.contains('is-flipped')) {
            cardDiv.classList.remove('is-flipped');
        } else {
            cardDiv.classList.add('is-flipped');
        }
    });
    this.render();
}
