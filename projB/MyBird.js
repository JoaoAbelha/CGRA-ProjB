/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBird extends CGFobject {
    constructor(scene,anguloY, v0, x,y,z) {
        super(scene);
        this.cubo = new MyUnitCubeQuad(scene);
        this.beak = new MyPyramid(scene,3,3,false);
        this.triangle = new MyTriangle(scene);
        this.coverts = new MySquare(scene);
        this.wings = new MyWings(scene, anguloY, v0, x, y, z);
        
        this.x = x;
        this.y = y;
        this.z = z;
        this.birdSpeed =v0;
        this.directionAngle = anguloY;

        this.Vmax = 0.5
        this.Vmin = 0;
        this.rotationSpeed = 0.05;
        this.flyAcceleration = 0.05;
        this.airResistence = 0.95;

        this.ScaleFactor = 1;
        this.SpeedFactor = 1;
        
        
       this.saveInitialValues();	
    }

    saveInitialValues() {
        this.initialbirdSpeed = this.birdSpeed;
        this.x0 = this.x;
        this.y0=this.y;
        this.z0=this.z;
        this.angInitial = this.directionAngle;
    }

    restoreInitialValues() {
        this.x = this.x0;
		this.y = this.y0;
        this.z = this.z0;
        this.birdSpeed =this.initialbirdSpeed;
        this.directionAngle = this.angInitial;
    }
    
    applyAirResistence() {
        this.birdSpeed = Math.max(this.Vmin, this.birdSpeed - 0.001);
	}

    update(t) {

        this.y = Math.sin((2*Math.PI* t/1000));
		this.z += this.birdSpeed * Math.cos(this.directionAngle);
        this.x += this.birdSpeed * Math.sin(this.directionAngle);
        this.wings.animate((2*Math.PI* t/1000), this.birdSpeed);  
        this.applyAirResistence();
    }

    accelerate(velocity) {
        let deltaSpeed = velocity * this.flyAcceleration;
        
        if (deltaSpeed > 0) {
            this.birdSpeed = Math.min(this.Vmax, this.birdSpeed + deltaSpeed);
        }
        else {
            this.birdSpeed = Math.max(this.Vmin, this.birdSpeed + deltaSpeed);
        }

        this.birdSpeed = (Math.round(Math.abs(birdSpeed)*10) / 10);
        this.birdSpeed *= this.SpeedFactor;
        
    }

    turn(angle) {
        this.directionAngle += angle * this.rotationSpeed;
    }

    moveBird() {
        //console.log(this.y);
        this.scene.translate(this.x, 10+ this.y, this.z);
        this.scene.rotate(this.directionAngle, 0, 1, 0);
        this.scene.scale(this.ScaleFactor, this.ScaleFactor, this.ScaleFactor);
    }

    display() {

        this.moveBird();
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
        this.scene.translate(0,0.5,-1.4);
        this.scene.rotate(Math.PI/4*3,1,0,0);
        this.scene.feather.apply();
        this.triangle.display();
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

        this.wings.display();

    }
    
    
}