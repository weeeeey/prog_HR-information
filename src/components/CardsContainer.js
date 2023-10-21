import { setCardStatus } from '../util/localStorage.js';

export default function CardsContainer({
    $app,
    initialstate,
    onClick,
    infinityScroll,
}) {
    this.state = initialstate;
    this.$target = document.createElement('div');
    this.$target.id = 'cards_container';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.inifinityFunc = () => {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver(
            (item) => {
                if (item[0].isIntersecting === true) {
                    infinityScroll();
                }
            },
            { threshold: 1 }
        );
        cards.forEach((card, idx) => {
            if (idx === this.state.personals.length - 1) {
                observer.observe(card);
            }
        });
    };

    this.render = () => {
        const { personals, cardStatus } = this.state;

        this.$target.innerHTML = ``;
        personals.forEach((info, idx) => {
            const cardDiv = document.createElement('div');
            cardDiv.className = cardStatus[idx % 10].status;
            cardDiv.setAttribute('data-id', idx % 10);
            cardDiv.innerHTML = `
                        <div class="card_plane card_plane--front">${info.nickname}</div>
                        <div class="card_plane card_plane--back">${info.mbti}</div>
                    `;
            this.$target.appendChild(cardDiv);
        });
        this.inifinityFunc();
    };

    this.$target.addEventListener('click', (e) => {
        let cardDiv = e.target.closest('.card');
        if (!cardDiv) {
            return;
        }

        const dataId = cardDiv.getAttribute('data-id');
        setCardStatus(dataId);
        onClick();
    });
    this.render();
}
