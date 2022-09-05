import { _decorator, Component, Node, sys, instantiate, Vec3, Prefab, debug } from 'cc';
import { MainLayout } from './MainLayout';
import { MessagePopup } from './MessagePopup';
import { PlayerEntity } from './PlayerEntity';
import { StartLayout } from './StartLayout';
const { ccclass, property } = _decorator;

type AddStartFunc = (a: number) => void;

const min: number = 1;
const max: number = 55;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

@ccclass('Controller')
export class Controller extends Component {

    

    @property({ type: StartLayout })
    startLayout: StartLayout = null!;
    @property({ type: MainLayout })
    mainLayout: MainLayout = null!;
    @property({ type: Prefab })
    msgPopupPrefab: Prefab;
    @property({ type: Node })
    popupParent: Node = null!;

    private _dataKey: string = 'playerData';
    private _playerData: PlayerEntity;

    start() {
        this.startLayout.node.active = true;
        this.mainLayout.node.active = false;

        this.startLayout.onStartBtnClickedAct = () => {
            // console.info("onStartBtnClicked");
            this.startLayout.node.active = false;
            this.mainLayout.node.active = true;
        }

        this._playerData = new PlayerEntity();
        this.mainLayout.onUpdateUI(this._playerData);
        
        this.mainLayout.onNextChar = () => 
        {
            console.log("mainLayout.onNextChar");
            this._playerData.playerIndex++;
            this._playerData.playerIndex = clamp(this._playerData.playerIndex, min, max);
            console.log(this._playerData.playerIndex);
            this.mainLayout.onUpdateUI(this._playerData);
        }
        this.mainLayout.onPrevChar = () => 
        {
            console.log("mainLayout.onPrevChar");
            this._playerData.playerIndex--;
            this._playerData.playerIndex = clamp(this._playerData.playerIndex, min, max);
            this.mainLayout.onUpdateUI(this._playerData);
        }
        this.mainLayout.onGetLvl = () => {
            this._playerData.lvlUp();
            this.mainLayout.onUpdateUI(this._playerData);
        }
        this.mainLayout.onAddStr = () => {
            if (this._playerData.remainPoint > 0) {
                this._playerData.remainPoint--;
                this._playerData.str++;
                this.mainLayout.onUpdateUI(this._playerData);
            }
        }
        this.mainLayout.onAddAgi = () => {
            if (this._playerData.remainPoint > 0) {
                this._playerData.remainPoint--;
                this._playerData.agi++;
                this.mainLayout.onUpdateUI(this._playerData);
            }
        }
        this.mainLayout.onAddInt = () => {
            if (this._playerData.remainPoint > 0) {
                this._playerData.remainPoint--;
                this._playerData.int++;
                this.mainLayout.onUpdateUI(this._playerData);
            }
        }
        this.mainLayout.onLoadData = () => {
            this.spawnPopup("Do you want to load data?", () => {
                this.loadData();
                this.mainLayout.onUpdateUI(this._playerData);
            });
        }
        this.mainLayout.onSaveData = () => {
            this.spawnPopup("Do you want to save data?", () => {
                this.saveData()
            });
        }
        this.mainLayout.onBtnCloseClicked = () => {
            this.spawnPopup("Do you want to quit app?", () => {
                this.startLayout.node.active = true;
                this.mainLayout.node.active = false;
                this._playerData = new PlayerEntity();
                this.mainLayout.onUpdateUI(this._playerData);
            });
        }
    }

    spawnPopup(msg: string, onConfirm: Function) {
        console.log(this.msgPopupPrefab == null);
        let msgPopup = instantiate(this.msgPopupPrefab);
        msgPopup.parent = this.popupParent;
        // msgPopup.setPosition(Vec3.ZERO);

        msgPopup.getComponent(MessagePopup).show(msg).setOnHide(onConfirm);
    }

    saveData() {
        sys.localStorage.setItem(this._dataKey, JSON.stringify(this._playerData));
    }
    loadData() {
        this._playerData = JSON.parse(sys.localStorage.getItem(this._dataKey));
        if (this._playerData == null) {
            this._playerData = new PlayerEntity();
        }
    }

    // update(deltaTime: number) {
        
    // }
}

