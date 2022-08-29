import { _decorator, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartLayout')
export class StartLayout extends Component {

    @property({ type: Button })
    btnStart: Button = null!;

    public onStartBtnClickedAct: Function;

    start() {
        // this.btnStart.clickEvents = onStartBtnClicked;
    }

    onEnable() {
        this.btnStart.node.on('click', this.onStartBtnClicked, this);
    }
    onDisable() {
        this.btnStart.node.off('click', this.onStartBtnClicked, this);
    }

    onStartBtnClicked() {
        this.onStartBtnClickedAct?.();
    }
}

