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

        this.Vmax = 0.01;
        this.Vmin = -0.01;
        this.flyAcceleration = 8E-5;
        this.airResistence = 0.9;
        
		
        //this.saveInitialValues();
    }

    saveInitialValues() {
        this.initialbirdSpeed = this.birdSpeed;
        this.x0 = this.x;
        this.y0=this.y;
        this.z0=this.z;
        this.angInitial = this.anguloY;
    }

    restoreInitialValues() {
        this.x = this.x0;
		this.y = this.y0;
        this.z = this.z0;
        this.birdSpeed =this.initialbirdSpeed;
        this.directionAngle = this.angInitial;
    }
    
    applyAirResistence() {
		this.birdSpeed -= this.birdSpeed * (1 - this.airResistence);
	}

    update(direction, deltaTime) {

		if (direction == "front") {
			this.accelerate(this.Vmax,deltaTime);
		}
		else if (direction == "back") {
			this.accelerate(this.Vmin,deltaTime);
        }
        else if (direction == "restart") {
            this.restoreInitialValues();
        }
		else {
			this.applyAirResistence();
        }
        

		//this.directionAngle += 

		this.z += this.birdSpeed * deltaTime * Math.cos(this.directionAngle);
		this.x += this.birdSpeed * deltaTime * Math.sin(this.directionAngle);

    }

    accelerate(velocity,deltaTime) {
        if (velocity > 0) {
            this.birdSpeed = Math.min(this.birdSpeed + this.flyAcceleration * deltaTime,velocity);
        }
        else {
            this.birdSpeed = Math.max(this.birdSpeed - this.flyAcceleration * deltaTime, velocity);
        }
    }

    applyAirResistence() {
		this.birdSpeed -= this.birdSpeed  - this.birdSpeed*this.airResistence;
    }

    moveBird() {
        //console.log(this.y);
        this.scene.translate(this.x, 3 + this.y, this.z);
        this.scene.rotate(this.directionAngle, 0, 1, 0);
        
    }
    
    animate(time) {
        this.y = Math.sin(time);
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