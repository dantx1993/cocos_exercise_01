
export class PlayerEntity {
    public lvl          : number;
    public remainPoint  : number;

    public str          : number;
    public agi          : number;
    public int          : number;
    
    public playerIndex  : number;

    constructor()
    {
        this.lvl = 1;
        this.remainPoint = 0;

        this.str = 0;
        this.agi = 0;
        this.int = 0;

        this.playerIndex = 1;
    }

    lvlUp()
    {
        this.lvl++;
        this.remainPoint += 5;
    }
}

