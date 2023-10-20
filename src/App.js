import ContentTitle from './components/ContentTitle.js';
import Header from './components/Header.js';
import { getData } from './util/api.js';

export default function App($app) {
    this.state = {
        location: '/',
        personals: [],
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
    this.setState = (nextState) => {
        this.state = nextState;
        contentTitle.setState(this.state.location);
    };
    this.init = async () => {
        try {
            const data = await getData();
        } catch (error) {
            throw new Error(error);
        }
    };
    this.init();
}
