class MyTreeBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder = new MyCylinder(scene,8,4,false,false);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5,1,0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.trunk.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}