class MyNest extends CGFobject {
    constructor(scene, x, z, texture) {
        super(scene);
        this.square = new MyQuad(scene);
        this.nestColor = new CGFappearance(scene);
        this.nestColor.setDiffuse(0.8, 0.8, 0.08);
        this.baseNest = new MyCircle(scene,8,1.5);

        this.straw = new MyCylinder(scene, 4, 4, true, true);
        this.x = x;
        this.z = z;
        this.branches = [];

        this.randomRotation = [];
        this.randomLenght = [];
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 12; i++) {
                this.randomRotation.push((Math.random() * (0.5 - (-0.5)) + (-0.5)).toFixed(2));
                this.randomLenght.push((Math.random() * (2 - (1.0)) + (1.0)).toFixed(2));
            }
        }

        this.texture = texture;

        
    }
    display() {

        this.scene.translate(this.x, 0, this.z);

        this.scene.pushMatrix();
        this.scene.translate(0,0.1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);  
        this.texture.apply(); 
        this.baseNest.display();
        this.scene.popMatrix();



        
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 12; i++) {
                this.scene.pushMatrix();
                this.scene.rotate(Math.PI / 6 * i - this.randomRotation[i + j], 0, 1, 0);
                this.scene.rotate(Math.PI / 12 - this.randomRotation[i + j], 1, 0, 0); 
                this.scene.translate(1, j * 0.1, -1);
                this.scene.rotate(this.randomRotation[i + j], 0, 1, 0);
                this.scene.scale(0.05, 0.05, this.randomLenght[i + j]); 
                this.texture.apply();
                this.straw.display();
                this.scene.popMatrix();
            }  
        }    

        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, 0);
        for (let i = 0; i < this.branches.length; i++) {
            this.scene.rotate(Math.PI / 4 * i, 0, 1, 0);
            this.branches[i].display();
        }
        this.scene.popMatrix();

    }
}