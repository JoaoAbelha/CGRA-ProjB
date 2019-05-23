class MyNest extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.square = new MyQuad(scene);
        this.nestColor = new CGFappearance(scene);
        this.nestColor.setDiffuse(0.8, 0.8, 0.08);
        this.x = x;
        this.z = z;
        this.branches = [];
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, 1, this.z);
        this.scene.scale(2, 1, 2);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.nestColor.apply();
        this.square.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 1, this.z);
        for (let i = 0; i < this.branches.length; i++) {
            this.scene.rotate(Math.PI / 4 * i, 0, 1, 0);
            this.branches[i].display();
        }
        this.scene.popMatrix();
    }
}