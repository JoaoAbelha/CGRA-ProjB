

class MyTriangle extends CGFobject{

	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			-1, 0, 0,
			1, 0, 0,
			0, 1, 0,
			-1, 0, 0,
			1, 0, 0,
			0, 1, 0
		];
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */
		this.texCoords = [
			0, 1,
			1, 1,
			0.5, 0,
			0, 1,
			1, 1,
			0.5, 0
			
		];


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

	}
}