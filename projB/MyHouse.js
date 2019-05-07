/**
 * MyHouse
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
        this.quad = new MyQuad(scene);
        this.pyramid = new MyPyramid(scene, 4, 1,true);
        this.prism = new MyPrism(scene, 8, 1);
        this.roofWidth = 5;
        this.roofLength = 5;
        this.houseWidth = 4.5;
        this.houseLength = 5;
        this.houseHeight = 2.5;
    };

    displayDoor() {
        const extraDeviation = 0.002; // the door must be a bit outside
        this.scene.pushMatrix()
        this.scene.scale(1.5, 3, 1);
        this.scene.translate(0, 0.5, this.houseLength / 2 + extraDeviation);
        this.scene.door.apply();
        this.quad.display();
        this.scene.popMatrix();
    }

    displayWindows() {
        const extraDeviation = 0.002; // the windows must be a bit outside
        let ang = 0;
        const HALF_PI = Math.PI / 2;

        //display four windows
        for(let nrWindow = 0; nrWindow < 4; nrWindow++) {
            this.scene.pushMatrix();
            this.scene.rotate(ang,0,1,0);
            this.scene.translate(0, 4.2, this.houseLength / 2 + extraDeviation);
            this.scene.scale(2,2,1);
            this.scene.window.apply();
            this.quad.display();
            this.scene.popMatrix();
            ang+=HALF_PI;
        }
    }

    displayRoof() {
        this.scene.pushMatrix();
        this.scene.translate(0, this.houseHeight * 2 + 0.3, 0);
        this.scene.scale(this.houseWidth, this.houseHeight, this.houseLength);
        this.scene.translate(0, 0.1, 0);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.roofTop.apply();
        this.pyramid.display();
        this.scene.popMatrix();
    }

    displayColumns() {
        this.scene.column.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.roofWidth / 2 + 0.3, 0, this.roofLength / 2 + 0.3);
        this.scene.scale(0.3, this.houseHeight * 2 + 0.6, 0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        
        this.prism.display();
        

        this.scene.translate(-this.houseLength * 3.7, 0, 0);
        this.prism.display();
        this.scene.translate(0, this.houseLength * 3.7, 0);
        this.prism.display();

        this.scene.translate(this.houseLength * 3.7, 0, 0);

        
        this.prism.display();
        

        this.scene.popMatrix();
    }

    displaychimney() {
        this.scene.pushMatrix();
        this.scene.translate(1, this.houseHeight * 2 + 2.5, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.scene.brickwall.apply();
        this.cube.display();
        this.scene.popMatrix();
    }


    displaySquaredHouse() {
        this.scene.pushMatrix();
        this.scene.scale(this.houseWidth, this.houseHeight, this.houseLength);
        this.scene.translate(0, 0.5, 0);
        this.scene.brickwall.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.houseHeight, 0);
        this.scene.scale(this.houseWidth, this.houseHeight * 1.6, this.houseLength);
        this.scene.translate(0, 0.5, 0);
        this.scene.whitewall.apply();
        this.cube.display();
        this.scene.popMatrix();

        this.displayDoor();
        this.displayWindows();
        this.displayRoof();
        this.displayColumns();
        this.displaychimney();
 
    }

    display() {
        this.displaySquaredHouse();
    };
}