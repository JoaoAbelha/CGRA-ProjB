/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param trunkTexture - texture of the trunk
 * @param treepTopTexture - texture of the tree top
 */

class MyTreeGroupPatch extends CGFobject {
    constructor(scene,Xnumber, zNumber) {
        super(scene);

        this.Xnumber = Xnumber;
        this.zNumber = zNumber;
        this.number = this.Xnumber * this.Xnumber;

        this.displacementsOnX = [];
        for (let i = 0; i < this.number; i++) {
            this.displacementsOnX.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.displacementsOnZ = [];
        for (let j = 0; j < this.number; j++) {
            this.displacementsOnZ.push(Math.floor(Math.random() * 2)).toFixed(4);
        }

        this.trees = [];

        for (let j = 0; j < this.number; j++) {
            let tree = new MyTreeAR(this.scene);
            tree.doGenerate();
            this.trees.push(tree);
        }


    };

    display() {
    
        let counter = 0;

        for (let i = 0; i < this.Xnumber; i++)
            for (let j = 0; j < this.zNumber; j++) {
                this.scene.pushMatrix();
                this.scene.translate(2 * i + this.displacementsOnX[counter], 0, 2 * j + this.displacementsOnZ[counter]);
                this.trees[counter].display();
                this.scene.popMatrix();
                counter++;
            }
    };
}