class MyLeaf extends CGFobject {
    constructor(scene) {
        super(scene);
        this.leaf = new MyParallelogram(this.scene);
     
    }
    display() {
        this.scene.pushMatrix();
        this.scene.colorLeaf.apply();   
        this.leaf.display();
        this.scene.popMatrix();

    }
}