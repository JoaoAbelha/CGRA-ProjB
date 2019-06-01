/*encapsulates the axiom and rules of a procedural modulation of a tree*/
class MyTree extends MyLSPlant {
    constructor(scene) {
        super(scene);
        this.initializeAxiomsAndRulesTree();

    };

    initializeAxiomsAndRulesTree() {

        this.axiom = "X";
        this.ruleF = "FF"; 
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.ruleY = "F[-X][X]+X";
        this.ruleZ = "F[+X]-X";
        this.rules3D = ["F[/X][X]F[\\X]+X",
                        "F[\\X][X]/X",
                        "F[/X]\\X",
                        "F[^X][X]F[&X]^X",
                        "F[^X][X]&X",
                        "F[&X]^X" ];
        this.angle = 30.0;
        this.iterations = 4;
        this.scaleFactor = 0.5;
         

        this.doGenerate = function () {
            this.lsplant = new MyLSPlant(this.scene);
            this.lsplant.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X": [ this.ruleX, this.ruleY, this.ruleZ ].concat(this.rules3D)
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
           
        }
    }

    display() {
        this.lsplant.display();
    }

}