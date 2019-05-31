
class MySemiSphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        var ang = Math.PI * 2 / this.slices;
        var alfa = 0;

        var ang2 = (Math.PI / 2) / this.stacks;
        var beta = 0;


        this.indices = [];
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        let verts = 0;

        for (let j = 0; j <= this.stacks; j++) {
            let x = Math.cos(beta);
            let y = 0;
            let z = Math.sin(beta);
            this.vertices.push(x, y, z);
            this.normals.push(x, y, z);
            this.texCoords.push(Math.asin(x) / Math.PI + 0.5, Math.asin(y) / Math.PI + 0.5);
            verts++;

            for (let i = 0; i < this.slices; i++) {
                alfa += ang;
                x = Math.cos(alfa) * (Math.cos(beta));
                y = Math.sin(alfa) * (Math.cos(beta));
                z = Math.sin(beta);
                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(Math.asin(x) / Math.PI + 0.5, Math.asin(y) / Math.PI + 0.5);
                verts++;

                if (j > 0 ) {
                    this.indices.push(verts - 1, verts - 2, verts - this.slices - 2);
                    this.indices.push(verts - this.slices - 3, verts - this.slices - 2, verts - 2);
                }
            }

            beta += ang2;


        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}