export default function Header({ $app, onClick }) {
    this.$target = document.createElement('header');
    $app.appendChild(this.$target);

    this.render = () => {
        this.$target.innerHTML = `
            <div class="header header_left">
                <span class="menu_name" id="menu_home" >HOME</span>
            </div>
            <div class="header header_right">
                <span class="menu_name" id="menu_signup" >SIGNUP</span>
            </div>
        
        `;

        const headerLeft = document.querySelector('.header_left');
        const headerRight = document.querySelector('.header_right');
        headerLeft.addEventListener('click', (e) => {
            onClick('/');
        });
        headerRight.addEventListener('click', (e) => {
            onClick('/signup');
        });
    };
    this.render();
}
