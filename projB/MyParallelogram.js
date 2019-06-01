class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,
            2, 0, 0,
            3, 1, 0,
            1, 1, 0,
            0, 0, 0,
            2, 0, 0,
            3, 1, 0,
            1, 1, 0,
        ];

        this.indices = [
            0, 1, 3,
            1, 2, 3,
            3, 1, 0,
            3, 2, 1,
            4, 5, 7,
            5, 6, 7,
            7, 5, 4,
            7, 6, 5,
        ];

        this.normals = [
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        ];

        this.texCoords = [
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 0,
            0, 1,
            1, 1,
            1, 0,
        ];

        this.primiteType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}