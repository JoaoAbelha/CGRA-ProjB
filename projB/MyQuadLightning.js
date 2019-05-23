class MyQuadLightning extends CGFobject {
    constructor(scene, scale) {
        super(scene);
        this.scale = scale;
        this.quad = new MyQuad(scene);
        this.quad1 = new CGFappearance(scene);
        this.quad1.setDiffuse(1, 1, 0, 1);
		
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.scale,2,1);
        this.quad1.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}