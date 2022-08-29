import { _decorator, Component, Node, RichText, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StatUI')
export class StatUI extends Component {
    @property({ type: RichText })
    statValue: RichText;
    @property({ type: Button })
    btnAdd: Button;

    public onAddStat: Function;

    onEnable() {
        this.btnAdd.node.on('click', this.onAddStat, this);
    }
    onDisable() {
        this.btnAdd.node.off('click', this.onAddStat, this);
    }

    updateUI(value: number, remainPoint: number) {
        this.statValue.string = value.toString();
        this.btnAdd.node.active = remainPoint > 0;
    }
}

