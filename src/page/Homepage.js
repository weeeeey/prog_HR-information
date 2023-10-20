import { getData } from '../util/api';

export default function Homepage($main) {
    this.state = {
        personals: [],
    };
    this.setState = (nextState) => {
        this.state = nextState;
    };
    this.init = async () => {
        try {
            const data = await getData();
        } catch (error) {}
    };
    this.init();
}
