import { _decorator, Component, Node, RichText, Button, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MessagePopup')
export class MessagePopup extends Component {

    @property({ type: Node })
    public root: Node;
    @property({ type: RichText })
    public txtMsg: RichText;
    @property({ type: Button })
    public btnOK: Button;
    @property({ type: Button })
    public btnCancel: Button;

    private onHide: Function;

    onEnable() {
        this.btnOK.node.on('click', this.onOkButtonClicked, this);
        this.btnCancel.node.on('click', this.onCancelButtonClicked, this);
    }
    onDisable() {
        this.btnOK.node.off('click', this.onOkButtonClicked, this);
        this.btnCancel.node.off('click', this.onCancelButtonClicked, this);
    }

    show(msg: string): MessagePopup {
        this.root.scale = Vec3.ZERO;
        this.txtMsg.string = msg;
        tween(this.root).to(0.25, { scale: Vec3.ONE }, { easing: 'linear' }).start();
        return this;
    }

    setOnHide(onHideFunc: Function) {
        this.onHide = onHideFunc;
    }

    hide() {
        tween(this.root).to(0.25, { scale: Vec3.ZERO }, { easing: 'linear' }).call(() => this.node.destroy()).start();
    }

    
    onOkButtonClicked() {
        this.onHide?.();
        this.hide();
    }
    onCancelButtonClicked() {
        this.hide();
    }
}

