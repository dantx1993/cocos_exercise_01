import { _decorator, Component, Node, RichText, Button, Sprite, resources, Texture2D, SpriteFrame, ImageAsset } from 'cc';
import { PlayerEntity } from './PlayerEntity';
import { StatUI } from './StatUI';
import { Controller } from './Controller';
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

    @property({ type: Button })
    btnClose: Button;

    @property({ type: Button })
    btnLvlUp: Button;
    @property({ type: Button })
    btnLoad: Button;
    @property({ type: Button })
    btnSave: Button;

    public onAddStr: Function;
    public onAddAgi: Function;
    public onAddInt: Function;

    public onNextChar: Function;
    public onPrevChar: Function;

    public onBtnCloseClicked: Function;

    public onGetLvl: Function;
    public onLoadData: Function;
    public onSaveData: Function;

    start() {
        this.strStatUI.onAddStat = this.onAddStr;
        this.agiStatUI.onAddStat = this.onAddAgi;
        this.intStatUI.onAddStat = this.onAddInt;
    }
    onEnable() {
        this.btnNextChar.node.on('click', this.onNextChar, this);
        this.btnPrevChar.node.on('click', this.onPrevChar, this);
        this.btnClose.node.on('click', this.onBtnCloseClicked, this);
        this.btnLvlUp.node.on('click', this.onGetLvl, this);
        this.btnLoad.node.on('click', this.onLoadData, this);
        this.btnSave.node.on('click', this.onSaveData, this);
    }
    onDisable() {
        this.btnNextChar.node.off('click', this.onNextChar, this);
        this.btnPrevChar.node.off('click', this.onPrevChar, this);
        this.btnClose.node.off('click', this.onBtnCloseClicked, this);
        this.btnLvlUp.node.off('click', this.onGetLvl, this);
        this.btnLoad.node.off('click', this.onLoadData, this);
        this.btnSave.node.off('click', this.onSaveData, this);
    }

    onUpdateUI(playerData: PlayerEntity) {                                                                                                                                                                                              
        this.txtLvl.string = playerData.lvl.toString();

        this.strStatUI.updateUI(playerData.str, playerData.remainPoint);
        this.agiStatUI.updateUI(playerData.agi, playerData.remainPoint);
        this.intStatUI.updateUI(playerData.int, playerData.remainPoint);
            // 1 => 01, 10 => 10
        var url = `Chars/${this.padWithZero(playerData.playerIndex)}`;
        resources.load(url, ImageAsset, (err, texture) => {
            if (err == null) {
                this.imgChar.spriteFrame = SpriteFrame.createWithImage(texture);
            }
            else {
                console.log(err);
            }
        });
    }

    isNullOrEmpty(str: string): boolean {
        return str && str.length > 0
    }
    padWithZero(num: number): String {
        var pad = "00";
        var result = (pad + num).slice(-pad.length);
        return result;
    }
}

