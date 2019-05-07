/**
 * MyCubeMap 
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
    constructor(scene) {
        super(scene);
        this.side = new MyQuadMap(scene);
        this.top = new MyQuadMap(scene);
        this.bottom = new MyQuadMap(scene);
    }

    updateBuffers() {

    }

    display() {
        this.scene.pushMatrix();
        const pi = Math.PI;
        this.scene.scale(60, 50, 60);
        this.scene.translate(0, 0.5, 0);
        this.scene.pushMatrix();
        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.rotate(-pi / 2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.hillsUP.apply();
        this.top.display();
        this.scene.popMatrix();

        /*this.scene.pushMatrix();
        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.rotate(pi / 2, 1, 0, 0);
        this.scene.translate(0, -0.001, 0.5);
        let newCoords = [0, 0, 20.0, 0, 0, 20.0, 20.0, 20.0];
        this.bottom.updateTexCoords(newCoords);
        this.scene.hillsDN.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.bottom.display();
        this.scene.popMatrix();*/


        this.scene.pushMatrix();
        this.scene.rotate(pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.hillsRT.apply();
        this.side.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(pi, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.hillsFT.apply();
        this.side.display();
        this.scene.popMatrix();

       this.scene.pushMatrix();
        this.scene.rotate(3 * pi / 2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.hillsLF.apply();
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.hillsBK.apply();
        this.side.display();
        this.scene.popMatrix();
        
    }
}