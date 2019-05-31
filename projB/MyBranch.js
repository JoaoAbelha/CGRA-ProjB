class MyBranch extends CGFobject {
    constructor(scene, x, z, rotation, radius, height, texture) {
        super(scene);
        this.cylinder = new MyCylinder(scene, 8, 4, true, true);
        this.radius = radius;
        this.height = height;
        this.x = x;
        this.z = z;
        this.rotation = rotation;
        this.texture = texture;
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.radius, this.z);
        this.scene.rotate(Math.PI * this.rotation, 0, 1, 0);
        this.scene.scale(this.radius, this.radius, this.height); 
        this.texture.apply();
        this.cylinder.display();
        this.scene.popMatrix();
    }
}