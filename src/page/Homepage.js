import { getData } from './../util/api.js';
import CardsContainer from '../components/CardsContainer.js';
import ContentTitle from '../components/ContentTitle.js';

export default function Homepage({ $app, location }) {
    this.state = {
        location,
        personals: [],
        cardStatus: [],
    };
    const contentTitle = new ContentTitle({
        $app,
        initialState: this.state.location,
    });

    const cardsContainer = new CardsContainer({
        $app,
        initialstate: {
            personals: this.state.personals,
            cardStatus: this.state.cardStatus,
        },
        onClick: () => {
            this.setState({
                ...this.state,
                cardStatus: JSON.parse(
                    window.localStorage.getItem('cardStatus')
                ),
            });
            console.log(this.state);
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
