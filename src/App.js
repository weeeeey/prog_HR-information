import Header from './components/Header.js';
import Homepage from './page/Homepage.js';
import SignupPage from './page/SignupPage.js';

export default function App($app) {
    this.state = {
        location: '/',
    };

    new Header({
        $app,
        onClick: (url) => {
            window.history.pushState('', '', url);
            const urlChange = new CustomEvent('urlChange', { detail: { url } });
            document.dispatchEvent(urlChange);

            this.setState({
                location: url,
            });
        },
    });
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        this.$target = document.createElement('main');
        this.$target.id = 'page_content';

        const $main = $app.querySelector('main');
        if ($main) {
            $app.removeChild($main);
        }
        $app.appendChild(this.$target);

        if (this.state.location === '/') {
            new Homepage({
                $app: this.$target,
                location: this.state.location,
            });
        }
        if (this.state.location === '/signup') {
            new SignupPage({
                $app: this.$target,
                location: this.state.location,
            });
        }
    };
    this.render();
}
