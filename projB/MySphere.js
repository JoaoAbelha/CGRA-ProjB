
class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.semi1 = new MySemiSphere(scene, slices, stacks);
        this.semi2 = new MySemiSphere(scene, slices, stacks);
    }

    display() {
        this.scene.pushMatrix();
        this.semi1.display();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.semi1.display();
        this.scene.popMatrix();
    }
}