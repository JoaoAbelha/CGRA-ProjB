/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBird extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cubo = new MyUnitCubeQuad(scene);
        this.beak = new MyPyramid(scene,3,3,false);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.scale(1.5,1.5,1.5);
        this.scene.feather.apply();
        this.cubo.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.25,1.25);
        this.scene.feather.apply();
        this.cubo.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.25,1.75);
        this.scene.rotate(Math.PI /2,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.colorBeak.apply();
        this.beak.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.eyeColor.apply();
        this.scene.translate(0.6,1.5,1.5);
        this.scene.scale(0.1,0.3,0.3);
        this.cubo.display();
        this.scene.translate(-2,0,0);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.eyeColor.apply();
        this.scene.translate(-0.6,1.5,1.5);
        this.scene.scale(0.1,0.3,0.3);
        this.cubo.display();
        this.scene.translate(-2,0,0);
        this.scene.popMatrix();
    }
}