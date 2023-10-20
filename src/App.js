import CardsContainer from './components/CardsContainer.js';
import ContentTitle from './components/ContentTitle.js';
import Header from './components/Header.js';
import { getData } from './util/api.js';

export default function App($app) {
    this.state = {
        location: '/',
        personals: [],
        cardStatus: [],
    };

    new Header({
        $app,
        onClick: (url) => {
            window.history.pushState('', '', url);
            const urlChange = new CustomEvent('urlChange', { detail: { url } });
            document.dispatchEvent(urlChange);

            this.setState({
                ...this.state,
                location: url,
            });
        },
    });

    this.$target = document.createElement('main');
    this.$target.id = 'page_content';
    $app.appendChild(this.$target);

    const contentTitle = new ContentTitle({
        $app: this.$target,
        initialState: this.state.location,
    });

    const cardsContainer = new CardsContainer({
        $app: this.$target,
        initialstate: {
            personals: this.state.personals,
            cardStatus: this.state.cardStatus,
        },
    });
    this.setState = (nextState) => {
        this.state = nextState;
        contentTitle.setState(this.state.location);
        cardsContainer.setState({
            personals: this.state.personals,
            cardStatus: this.state.cardStatus,
        });
    };
    this.init = async () => {
        try {
            const [data, cardStatus] = await getData();

            this.setState({
                ...this.state,
                personals: data,
                cardStatus,
            });
        } catch (error) {
            throw new Error(error);
        }
    };
    this.init();
}
