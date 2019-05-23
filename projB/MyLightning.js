class MyLightning extends MyLSystem {
        constructor(scene) {
            super(scene);
        }
    
        initGrammar() {
            this.grammar = {
                "F": new MyQuadLightning(this.scene,0.1),
                "X": new MyQuadLightning(this.scene,0.1)
            };
        };
}