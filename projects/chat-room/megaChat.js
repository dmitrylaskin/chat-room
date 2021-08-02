import LoginWindow from "./ui/loginWindow";
import MainWindow from "./ui/mainWindow";
import UserName from "./ui/userName";
import UserList from "./ui/userList";
import MessageList from "./ui/messageList";
import WSClient from "./wsClient";
import MessageSender from "./ui/messageSender";

export default class MegaChat {
    constructor() {
        this.wsClient = new WSClient(`ws://${location.host}/chat-room/ws`, this.onMessage.bind(this))

    this.ui = {
        loginWindow: new LoginWindow(
            document.querySelector('#login'), this.onLogin.bind(this)
        ),
        mainWindow: new MainWindow(
            document.querySelector('#main')
        ),
        userName: new UserName(
            document.querySelector('[data-role=user-name]')
        ),
        userList: new UserList(
            document.querySelector('[data-role=user-list]')
        ),
        messageList: new MessageList(
            document.querySelector('[data-role=message-list]')
        ),
        messageSender: new MessageSender(
            document.querySelector('[data-role=message-sender]'), this.onSend.bind(this)
        ),
    }

    this.ui.loginWindow.show()
};
    onSend(message) {
        this.wsClient.sendTextMessage(message)
        this.ui.messageSender.clear()
    }

    async onLogin(name) {
        // await this.wsClient.connect()
        // this.wsClient.sendHello(name)
        this.ui.loginWindow.hide()
        this.ui.mainWindow.show()
        this.ui.userName.set(name)
    }
    onMessage({type, from, data}) {
        if (type === 'hello') {
            this.ui.userList.add(from)
            this.ui.messageList.addSystemMessage(`${from} entered the chat`)
        } else if (type === 'user-list') {
            for (const item of data) {
                this.ui.userList.add(item)
            }
        } else if (type === 'bye-bye') {
            this.ui.userList.remove(from)
            this.ui.messageList.addSystemMessage(`${from} left chat`)
        } else if (type === 'text-message') {
            this.ui.messageList.add(from, data.message)
        }
    }
}