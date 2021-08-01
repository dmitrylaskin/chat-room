
export default class Chat {
    constructor() {
    this.ui = {
        loginWindow: new LoginWindow(
            document.querySelector('#login'), this.onLogin.bind(this)
        ),
        mainWindow: new MainWindow(
            document.querySelector('#main'), this.onLogin.bind(this)
        ),
        userName: new UserName(
            document.querySelector('[data-role=user-name]'))
    }
    this.ui.loginWindow.show()
};
    async onLogin(name) {
        this.ui.loginWindow.hide()
        this.ui.mainWindow.show()
        this.ui.userName.set(name)
    }
}