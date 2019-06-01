/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param trunkTexture - texture of the trunk
 * @param treepTopTexture - texture of the tree top
 */

class MyTreeGroupPatch extends CGFobject {
    constructor(scene) {
        super(scene);

        this.displacementsOnX = [];
        for(let i = 0; i < 9; i++) {
            this.displacementsOnX.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.displacementsOnZ = [];
        for(let j = 0; j < 9; j++) {
            this.displacementsOnZ.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.trees = [];
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
                        "F[&X]^X"    ];
        this.angle = 30.0;
        this.iterations = 4;
        this.scaleFactor = 0.5;
         

        this.doGenerate = function () {
            let lsplant = new MyLSPlant(this.scene);
            lsplant.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X": [ this.ruleX, this.ruleY, this.ruleZ ].concat(this.rules3D)
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
            this.trees.push(lsplant);
        }

        for (let i = 0; i < 9; i++) {
            this.doGenerate();
        }
    }

    display() {
        const side = 3;

        let counter = 0;

        for(let i = 0; i< side; i++)
            for(let j = 0; j<  side; j++) {
                this.scene.pushMatrix();
                this.scene.translate(2*i + this.displacementsOnX[counter] ,0, 2*j + this.displacementsOnZ[counter]);
                this.trees[counter].display();
                this.scene.popMatrix();
                counter++;
            }
    };
}