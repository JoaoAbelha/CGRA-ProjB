/*encapsulates the axiom and rules of a procedural modulation of a tree*/
class MyTreeAR extends MyLSPlant {
    constructor(scene) {
        super(scene);
        this.initializeAxiomsAndRulesTree();

    };

    initializeAxiomsAndRulesTree() {

        this.axiom = "X";
        this.ruleF = "FF"; 
        this.rulesX = [];
        this.rulesX.push("F[-X][X]F[-X]+FX");
        this.rulesX.push("F[-X][X]+X");
        this.rulesX.push("F[+X]-X");
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
                    "X": this.rulesX.concat(this.rules3D)
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