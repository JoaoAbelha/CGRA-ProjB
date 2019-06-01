class MyLSPlant extends MyLSystem {
    constructor(scene) {
        super(scene);
    }

    initGrammar() {
        this.grammar = {
            "F": new MyTreeBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    };
    
}