export default function ContentTitle({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'content_title';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const text =
            this.state === '/' ? 'Great PeoPle!' : 'Sign Up, GreatPeople!';
        this.$target.innerHTML = `
            <h1>${text}</h1>
        `;
    };
    this.render();
}
