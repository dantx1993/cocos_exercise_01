import { _decorator, Component, Node, sys } from 'cc';
import { MainLayout } from './MainLayout';
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
            this.loadData();
            this.mainLayout.onUpdateUI(this._playerData);
        }
        this.mainLayout.onSaveData = () => {
            this.saveData();
        }
    }

    saveData() {
        sys.localStorage.setItem(this._dataKey, JSON.stringify(this._playerData));
    }
    loadData() {
        this._playerData = JSON.parse(sys.localStorage.getItem(this._dataKey));
    }

    // update(deltaTime: number) {
        
    // }
}

