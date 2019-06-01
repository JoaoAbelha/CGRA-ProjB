class MyCircle extends CGFobject {
    constructor(scene, slices, radius) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.initBuffers();
    };

    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        var ang = (2 * Math.PI) / this.slices;

    
        for (var i = 0; i < this.slices; i++) {
            let x1 = Math.cos(ang * i);
            let y1 = Math.sin(ang * i);
            let x2 = Math.cos(ang * (i + 1));
            let y2 = Math.sin(ang * (i + 1));

            this.vertices.push(x1 * this.radius, y1 * this.radius, 0);
            this.vertices.push(x2 * this.radius, y2 * this.radius, 0);
            this.vertices.push(0, 0, 0);
            let temp = this.vertices.length / 3;

            this.indices.push(temp - 3, temp - 2, temp - 1);

            this.normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

            this.texCoords.push(0.5 + x1 / 2, 0.5 - y1 / 2);
            this.texCoords.push(0.5 + x2 / 2, 0.5 - y2 / 2);
            this.texCoords.push(0.5, 0.5);
        }

        this.vertices.push(Math.cos(ang), Math.sin(ang));


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    };
}