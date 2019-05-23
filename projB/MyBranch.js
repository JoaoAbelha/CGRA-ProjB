class MyBranch extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.cylinder = new MyCylinder(scene, 8, 4, true, true);
        this.branchColor = new CGFappearance(scene);
        this.branchColor.setDiffuse(0.55, 0.27, 0.08);
        this.x = x;
        this.z = z;
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, 1, this.z);
        this.scene.scale(0.1, 0.1, 2.5);
        this.branchColor.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}