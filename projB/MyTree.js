/**
 * MyTreeGroupPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param trunkTexture - texture of the trunk
 * @param treepTopTexture - texture of the tree top
 */
 /*posicao x,y,z respetivas das arvores em cena individuais*/ 
class MyTree extends  CGFobject {
    constructor(scene,position) {
        super(scene);

       this.number = position.length;
       this.position = position;
       this.tree = new MyTreeAR(this.scene);
       this.tree.doGenerate();
    };

    display() {
        for(let i=0; i < this.number; i= i+3) {
            this.scene.pushMatrix();
            this.scene.translate(this.position[i],this.position[i+1],this.position[i+2]);
            this.tree.display();
            this.scene.popMatrix();
        }
     };
}