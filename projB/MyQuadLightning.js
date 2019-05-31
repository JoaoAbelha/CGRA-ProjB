class MyQuadLightning extends CGFobject {
    constructor(scene, scale) {
        super(scene);
        this.scale = scale;
        this.quad = new MySquare(scene);
        this.quad1 = new CGFappearance(scene);
        this.quad1.setAmbient(0.9, 0.9, 0.9, 1);
		
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.scale,2,1);
        this.quad1.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}