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

        //Initialize textures
        this.initializeTextures();

        //Initialize scene objects
        this.intializeObjects();

    }

    intializeObjects() {

        this.image = new MyCubeMap(this);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this,0,0,0,0,0);
        this.terrain = new MyTerrain(this);

        let numberOfBranches = 5;

        this.branches = [];
        for (let i = 0; i < numberOfBranches; i++) {
            let x = (Math.random() * (10.0 - (-10.0)) + (-10.0)).toFixed(1);
            let z = (Math.random() * (10.0 - (-10.0)) + (-10.0)).toFixed(1);
            let rotation = (Math.random() * (1.0 - (0.0)) + (0.0)).toFixed(1);
            let radius = (Math.random() * (0.3 - (0.15)) + (0.15)).toFixed(2);
            let height = (Math.random() * (3.0 - (1.0)) + (1.0)).toFixed(1);
            this.branches.push(new MyBranch(this, x, z, rotation, radius, height, this.trunk));
        }

        this.nest = new MyNest(this, -7, 7, this.trunk);

        this.treesGroup = new MyTreeGroupPatch(this,3,3);
        this.treesGroup2 = new MyTreeGroupPatch(this,3,1);
        this.treesGroup3 = new MyTreeGroupPatch(this,3,3);

        let position = [2,5, -17,
                       -5,5,-17,
                        7,5,-17,
                        12,5,-13,
                       -9,5,13]; /*x,y,z...*/ 
        this.tree = new MyTree(this, position);


        this.lightning =  new MyLightning(this);

        //Objects connected to MyInterface
        this.axis = new CGFaxis(this);
        this.displayAxis = true;
        this.scaleFactor = 1;
        
    }

    initializeTextures() {
        this.initializeDayCubeMapTextures();
        this.initializeHouseTextures();
        this.initializeBirdTextures();
        this.initializeTreeTextures();
    }

    initializeBirdTextures() {
        this.feather = new CGFappearance(this);
        this.feather.setAmbient(1,1,1,1);
        this.feather.setDiffuse(1,1,1,1);
        this.feather.loadTexture('images/feather.jpg');
        this.feather.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


        this.colorBeak = new CGFappearance(this);
        this.colorBeak.setAmbient(0.83,0.7,0.2,1);
        this.colorBeak.setDiffuse(0.83,0.7,0.2,1);
        this.colorBeak.loadTexture('images/beak.jpg');
        this.colorBeak.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        
        this.eyeColor = new CGFappearance(this);
        this.eyeColor.setAmbient(1,1,1,1);
        this.eyeColor.setDiffuse(1,1,1,1);
        this.eyeColor.loadTexture('images/iris.png');
        this.eyeColor.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
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

    initializeTreeTextures() {
        this.trunk = new CGFappearance(this);
        this.trunk.setAmbient(0.85, 0.8, 0.55, 1);
        this.trunk.setDiffuse(0.85, 0.8, 0.55, 1);
        this.trunk.setSpecular(0.01, 0.01, 0.01, 1);
        this.trunk.setShininess(1.0);
        this.trunk.loadTexture('images/trunk.jpg');
        this.trunk.setTextureWrap('REPEAT', 'REPEAT');

        this.colorLeaf = new CGFappearance(this);
        this.colorLeaf.setAmbient(0.9,0.9,0.9,1);
        this.colorLeaf.setDiffuse(0.9,0.9,0.9,1);
        this.colorLeaf.setSpecular(0.9,0.9,0.9,1);
        this.colorLeaf.setShininess(10.0);
        this.colorLeaf.loadTexture('images/Leaf.jpg');
        this.colorLeaf.setTextureWrap('REPEAT','REPEAT');
        

        
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setAmbient(0.5, 0.5, 0.5, 1.0);
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
			this.bird.accelerate(1);
		}
		if (this.gui.isKeyPressed("KeyS")) {
			this.bird.accelerate(-1);
        }
        if (this.gui.isKeyPressed("KeyD")) {
			this.bird.turn(-2)
        }
        if (this.gui.isKeyPressed("KeyA")) {
			this.bird.turn(2);
        }
        if (this.gui.isKeyPressed("KeyP")) {
            this.bird.drop();
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.bird.restoreInitialValues();   
        }
        if (this.gui.isKeyPressed("KeyL")) {
            this.lightning.startAnimation(this.time);
        }  
    }

    update(t) {
        this.time = t;
        this.checkKeys();
        this.bird.update(t);
        this.lightning.update(t); 
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
         if (this.displayAxis)
            this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
            0.0, this.scaleFactor, 0.0, 0.0,
            0.0, 0.0, this.scaleFactor, 0.0,
            0.0, 0.0, 0.0, 1.0];

            this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        

        //house
        this.pushMatrix();
        this.translate(-5, 0, -8);
        this.scale(0.6, 0.6, 0.6);
        this.house.display();
        this.popMatrix();

        //bird
        this.pushMatrix();
        this.bird.display();
        this.popMatrix();

        //terrain
        this.terrain.display();

        //branches
        for (let i = 0; i < this.branches.length; i++) {
            this.branches[i].display();
        }

        //nest
        this.pushMatrix();
        this.nest.display();
        this.popMatrix();



       //trees
        this.pushMatrix();
        this.treesGroup.display();
        this.translate(0, 0, 4);
        this.treesGroup3.display();
        this.popMatrix();

        this.pushMatrix();
        this.treesGroup2.display();
        this.translate(-15,5,-13);
        this.popMatrix();

        //cubemap
        this.pushMatrix();
        this.image.display();
        this.popMatrix();


    

        this.tree.display();

        //lightning
        this.pushMatrix();
        this.lightning.display();
        this.popMatrix();

        
        

        
    
        // ---- END Primitive drawing section
    }
}