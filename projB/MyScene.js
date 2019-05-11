/**
* MyScene
* @constructor
*/

const FPS = 60;

class MyScene extends CGFscene {
    constructor() {
        super();
        this.time = 0;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(1000/FPS);

        //Initialize scene objects

        this.intializeObjects();

        this.initializeDayCubeMapTextures();
        this.initializeHouseTextures();
        this.initializeBirdTextures();

        //Objects connected to MyInterface
    }

    intializeObjects() {

        this.plane = new Plane(this, 32);
        this.image = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this,0,0,0,0,0);
        this.terrain = new MyTerrain(this);

        //Objects connected to MyInterface
        this.axis = new CGFaxis(this);
        this.scaleFactor = 1;
        
    }

    initializeBirdTextures() {
        this.feather = new CGFappearance(this);
        this.feather.setDiffuse(0.1,0.8,1,1);
        this.colorBeak = new CGFappearance(this);
        this.colorBeak.setDiffuse(0.83,0.7,0.2,1);
        this.eyeColor = new CGFappearance(this);
        this.eyeColor.setDiffuse(0.44,0.5,0.56);
    }
    initializeDayCubeMapTextures() {
        this.hillsBK = new CGFappearance(this);
        this.hillsBK.setAmbient(1, 1, 1, 1);
        this.hillsBK.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsBK.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsBK.setShininess(10.0);
        this.hillsBK.loadTexture('images/sor_hills/hills_bk_day.JPG');
        this.hillsBK.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


        this.hillsLF = new CGFappearance(this);
        this.hillsLF.setAmbient(1, 1, 1, 1);
        this.hillsLF.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsLF.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsLF.setShininess(10.0);
        this.hillsLF.loadTexture('images/sor_hills/hills_lf_day.JPG');
        this.hillsLF.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsRT = new CGFappearance(this);
        this.hillsRT.setAmbient(1, 1, 1, 1);
        this.hillsRT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsRT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsRT.setShininess(10.0);
        this.hillsRT.loadTexture('images/sor_hills/hills_rt_day.JPG');
        this.hillsRT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsFT = new CGFappearance(this);
        this.hillsFT.setAmbient(1, 1, 1, 1);
        this.hillsFT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsFT.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsFT.setShininess(10.0);
        this.hillsFT.loadTexture('images/sor_hills/hills_ft_day.JPG');
        this.hillsFT.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.hillsUP = new CGFappearance(this);
        this.hillsUP.setAmbient(1, 1, 1, 1);
        this.hillsUP.setDiffuse(0.9, 0.9, 0.9, 1);
        this.hillsUP.setSpecular(0.4, 0.4, 0.4, 1);
        this.hillsUP.setShininess(10.0);
        this.hillsUP.loadTexture('images/sor_hills/hills_up_day.JPG');
        this.hillsUP.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    initializeHouseTextures() {
        this.roofTop = new CGFappearance(this);
        this.roofTop.setAmbient(0.3, 0.3, 0.3, 1);
        this.roofTop.setDiffuse(0.5, 0.5, 0.5, 1);
        this.roofTop.setSpecular(0.01, 0.01, 0.01, 1);
        this.roofTop.setShininess(1.0);
        this.roofTop.loadTexture('images/rooftop1.jpg');
        this.roofTop.setTextureWrap('REPEAT', 'REPEAT');

        this.column = new CGFappearance(this);
        this.column.setAmbient(0.3, 0.3, 0.3, 1);
        this.column.setDiffuse(0.5, 0.5, 0.5, 1);
        this.column.setSpecular(0.1, 0.1, 0.1, 1);
        this.column.setShininess(1.0);
        this.column.loadTexture('images/column.jpg');
        this.column.setTextureWrap('REPEAT', 'REPEAT');


        this.brickwall = new CGFappearance(this);
        this.brickwall.setAmbient(0.8, 0.8, 0.4, 1);
        this.brickwall.setDiffuse(0.9, 0.9, 0.9, 1);
        this.brickwall.setSpecular(0.01, 0.01, 0.01, 1);
        this.brickwall.setShininess(1.0);
        this.brickwall.loadTexture('images/wall2.jpg');
        this.brickwall.setTextureWrap('REPEAT', 'REPEAT');

        this.whitewall = new CGFappearance(this);
        this.whitewall.setAmbient(0.7, 0.7, 0.7, 1);
        this.whitewall.setDiffuse(0.9, 0.9, 0.9, 1);
        this.whitewall.setSpecular(0.01, 0.01, 0.01, 1);
        this.whitewall.setShininess(1.0);
        this.whitewall.loadTexture('images/whitewall.jpg');
        this.whitewall.setTextureWrap('REPEAT', 'REPEAT');

        this.door = new CGFappearance(this);
        this.door.setAmbient(0.55, 0.65, 0.65, 1);
        this.door.setDiffuse(0.2, 0.7, 0.45, 1);
        this.door.setSpecular(0.01, 0.01, 0.01, 1);
        this.door.setShininess(1.0);
        this.door.loadTexture('images/door2.jpg');
        this.door.setTextureWrap('REPEAT', 'REPEAT');

        this.window = new CGFappearance(this);
        this.window.setAmbient(0.7, 0.75, 0.8, 1);
        this.window.setDiffuse(0.9, 0.95, 1, 1);
        this.window.setSpecular(0.01, 0.01, 0.01, 1);
        this.window.setShininess(1.0);
        this.window.loadTexture('images/window.jpg');
        this.window.setTextureWrap('REPEAT', 'REPEAT');
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys() {
		if (this.gui.isKeyPressed("KeyW")) {
			this.bird.update("front");
		}
		if (this.gui.isKeyPressed("KeyS")) {
            this.bird.update("back");
        }
        if (this.gui.isKeyPressed("KeyD")) {
			this.bird.update("right");
        }
        if (this.gui.isKeyPressed("KeyA")) {
			this.bird.update("left");
        }
        if (this.gui.isKeyPressed("KeyR")) {
            console.log("r");
            this.bird.update("restart");
            
        }
		else {
			this.bird.update("none");
        } 
   
    }

    update(t) {
        this.time = t;
        this.checkKeys();

        
        this.bird.animate(2*Math.PI* t/1000);
        
        
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0];

            this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        
        this.pushMatrix();
        this.image.display();
        this.popMatrix();

        // this.pushMatrix();
        // this.house.display();
        // this.popMatrix();
        this.pushMatrix();
        this.bird.display();
        this.popMatrix();

        this.terrain.display();

        // ---- END Primitive drawing section
    }
}