/** 
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);

        this.side = new MyQuad(scene);
        this.top = new MyQuad(scene);
        this.bottom = new MyQuad(scene);
    }

    updateBuffers() {

    }

    display() {
        this.scene.pushMatrix();

        const pi = Math.PI;

        this.scene.rotate(-pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);

        this.top.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();


        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(pi, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.rotate(3 * pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);

        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);

        this.side.display();


        this.scene.translate(0, -0.5, -0.5);
        this.scene.rotate(pi / 2, 1, 0, 0);
        this.bottom.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.popMatrix();
    }
}