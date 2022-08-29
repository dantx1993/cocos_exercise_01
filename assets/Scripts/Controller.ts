import { _decorator, Component, Node } from 'cc';
import { StartLayout } from './StartLayout';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {

    @property({ type: StartLayout })
    startLayout: StartLayout = null!;

    start() {
        this.startLayout.onStartBtnClickedAct = () => {
            console.info("onStartBtnClicked");
        }
    }

    // update(deltaTime: number) {
        
    // }
}

