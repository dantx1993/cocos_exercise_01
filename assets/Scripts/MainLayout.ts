import { _decorator, Component, Node, RichText, Button, Sprite, resources } from 'cc';
import { PlayerEntity } from './PlayerEntity';
import { StatUI } from './StatUI';
const { ccclass, property } = _decorator;

@ccclass('MainLayout')
export class MainLayout extends Component {

    @property({ type: RichText })
    txtLvl: RichText;

    @property({ type: StatUI })
    strStatUI: StatUI;
    @property({ type: StatUI })
    agiStatUI: StatUI;
    @property({ type: StatUI })
    intStatUI: StatUI;

    @property({ type: Button })
    btnNextChar: Button;
    @property({ type: Button })
    btnPrevChar: Button;
    @property({ type: Sprite })
    imgChar: Sprite

    public onAddStat: Function;
    public onNextChar: Function;
    public onPrevChar: Function;

    start() {
        this.strStatUI.onAddStat = this.onAddStat;
        this.agiStatUI.onAddStat = this.onAddStat;
        this.intStatUI.onAddStat = this.onAddStat;
    }
    onEnable() {
        this.btnNextChar.node.on('click', this.onNextChar, this);
        this.btnPrevChar.node.on('click', this.onPrevChar, this);
    }
    onDisable() {
        this.btnNextChar.node.off('click', this.onNextChar, this);
        this.btnPrevChar.node.off('click', this.onPrevChar, this);
    }

    onUpdateUI(playerData: PlayerEntity) {
        this.txtLvl.string = playerData.lvl.toString();

        this.strStatUI.updateUI(playerData.str, playerData.remainPoint);
        this.agiStatUI.updateUI(playerData.agi, playerData.remainPoint);
        this.intStatUI.updateUI(playerData.int, playerData.remainPoint);

        // this.imgChar.spriteFrame = resources.load("Char/")
    }
}

