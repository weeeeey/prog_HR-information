import ContentTitle from '../components/ContentTitle.js';

export default function SignupPage({ $app, location }) {
    this.state = {
        location,
    };
    const contentTitle = new ContentTitle({
        $app,
        initialState: this.state.location,
    });
    this.setState = (nextState) => {
        this.state = nextState;
        contentTitle.setState(this.state.location);
    };
    this.init = () => {};
    this.init();
}
