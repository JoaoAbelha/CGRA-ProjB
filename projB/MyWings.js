/**
 * MyWings
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyWings extends CGFobject {
    constructor(scene,anguloY, v0, x,y,z) {
        super(scene);
        this.triangle = new MyTriangle(scene);
        this.coverts = new MySquare(scene);
        

        this.x = x;
        this.y = y;
        this.z = z;
    }

    animate(time) {
        this.y = Math.sin(time) + 50;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(1,0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI / 6 ,0,1,0);
        this.scene.scale(3.5,1.5,2);
        this.scene.feather.apply();
        this.coverts.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1,0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI / 6 ,0,1,0);
        this.scene.scale(3.5,1.5,2);
        this.scene.feather.apply();
        this.coverts.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2.5,1.4,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(-Math.PI/4,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.8,1.5,1);
        this.scene.feather.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2.5,1.4,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(5*Math.PI/4,0,1,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.8,1.5,1);
        this.scene.feather.apply();
        this.triangle.display();
        this.scene.popMatrix();
    }
}