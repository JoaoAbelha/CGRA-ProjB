/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBird extends CGFobject {
    constructor(scene,anguloY, v0, x,y,z) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20);
        this.semisphere = new MySemiSphere(scene, 20, 20);
        this.beak = new MyPyramid(scene,3,3,false);
        this.triangle = new MyTriangle(scene);
        this.coverts = new MySquare(scene);
        this.wings = new MyWings(scene, anguloY, v0, x, y, z);

        this.quad = new MyQuad(scene);
        
        this.x = x;
        this.y = y;
        this.z = z;
        this.birdSpeed = v0;
        this.directionAngle = anguloY;

        this.Vmax = 0.5
        this.Vmin = 0;
        this.rotationSpeed = 0.05;
        this.flyAcceleration = 0.1;
        this.airResistence = 0.95;

        this.ScaleFactor = 1;
        this.SpeedFactor = 1;

        this.grabbingBranch = 0;
        this.branch = null;

        
        this.state = 0;
        //states:
        //  0 - up in the air
        //  1 - dropping
        //  2 - flying upwards
        
        this.saveInitialValues();	
    }

    saveInitialValues() {
        this.initialbirdSpeed = this.birdSpeed;
        this.x0 = this.x;
        this.y0 = this.y;
        this.z0 = this.z;
        this.angInitial = this.directionAngle;
    }

    restoreInitialValues() {
        this.x = this.x0;
		this.y = this.y0;
        this.z = this.z0;
        this.birdSpeed =this.initialbirdSpeed;
        this.directionAngle = this.angInitial;
        this.state = 0;
    }
    
    applyAirResistence() {
        this.birdSpeed = Math.max(this.Vmin, this.birdSpeed - 0.001);
	}

    update(t) {
        
        if (this.state == 1) {
            this.y -= 0.5;
            if (this.y <= 0.5)
                this.state = 2;
        }
        else if (this.state == 2) {
            this.y += 0.5;
            if (this.y >= 9.5)
                this.state = 0;
        }
        else
            this.y = Math.sin((2*Math.PI* t/1000)) + 10;

		this.z += this.birdSpeed * this.SpeedFactor * Math.cos(this.directionAngle);
        this.x += this.birdSpeed * this.SpeedFactor * Math.sin(this.directionAngle);
        this.wings.animate((2*Math.PI* t/1000), this.birdSpeed);  
        this.applyAirResistence();
        this.colision();
    }

    accelerate(velocity) {
        let deltaSpeed = velocity * this.flyAcceleration;
        
        if (deltaSpeed > 0) {
            this.birdSpeed = Math.min(this.Vmax, this.birdSpeed + deltaSpeed);
        }
        else {

            this.birdSpeed = Math.max(this.Vmin, this.birdSpeed + deltaSpeed);
        }
    }

    turn(angle) {
        this.directionAngle += angle * this.rotationSpeed;
    }

    drop() {
        if (this.state == 0)
            this.state = 1;
    }

    moveBird() {
        this.quad.display();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.directionAngle, 0, 1, 0);
        this.scene.scale(this.ScaleFactor - 0.5, this.ScaleFactor -  0.5, this.ScaleFactor - 0.5);
    }

    colision() {
        //ifs que verificam colisao devem ser alterados consoante o tamanho dos objetos em questao
        if (!this.grabbingBranch) {
            let branches = this.scene.branches;
            for (let i = 0; i < branches.length; i++) {
                if (this.y < 0.5 && Math.abs(branches[i].x -this.x) < 2.5 && Math.abs(branches[i].z - this.z) < 2.5) {
                    this.branch = branches[i];
                    this.branch.x = 0;
                    this.branch.z = 0;
                    branches.splice(i, 1);
                    this.grabbingBranch = 1;
                    break;
                }
            }
        }
        else {
            if (this.y < 0.5 && Math.abs(this.x - this.scene.nest.x) < 2 && Math.abs(this.z - this.scene.nest.z) < 2 ) {
                this.grabbingBranch = 0;
                this.scene.nest.branches.push(this.branch);
            }
        }
    }

    display() {

        this.moveBird();
        
        //front body
        this.scene.pushMatrix();
        this.scene.feather.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //back body
        this.scene.pushMatrix();
        this.scene.scale(1,1,2);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.feather.apply();
        this.semisphere.display();
        this.scene.popMatrix();

        //head
        this.scene.pushMatrix();
        this.scene.translate(0,1.25,1.25);
        this.scene.feather.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //eyes
        this.scene.pushMatrix();
        this.scene.eyeColor.apply();
        this.scene.translate(0.6,1.5,1.7);
        this.scene.scale(0.4,0.4,0.4);
        this.sphere.display();
        this.scene.translate(-2,0,0);
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.eyeColor.apply();
        this.scene.translate(-0.6,1.5,1.7);
        this.scene.scale(0.4,0.4,0.4);
        this.sphere.display();
        this.scene.translate(-2,0,0);
        this.scene.popMatrix();

        //beack
        this.scene.pushMatrix();
        this.scene.translate(0,1.25,2.25);
        this.scene.rotate(Math.PI /2,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.3,0.3,0.3);
        this.scene.colorBeak.apply();
        this.beak.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-2.3);
        this.scene.rotate(Math.PI/4*3,1,0,0);
        this.scene.feather.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.wings.display();

        if (this.grabbingBranch) {
            this.scene.pushMatrix();
            this.scene.translate(-1.3, 0, 2);
            this.scene.rotate(-Math.PI * this.branch.rotation + Math.PI/2,0,1,0);
            this.branch.display();
            this.scene.popMatrix();
        }

    }
    
    
}