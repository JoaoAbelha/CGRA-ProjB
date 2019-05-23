class MyTerrain extends CGFobject {
    constructor (scene) {
        super(scene);
        this.plane = new Plane(scene, 256);

        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        
        this.terrainTex = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.terrainGrad = new CGFtexture(this.scene, "images/altimetry.png");
        
        this.appearance.setTexture(this.terrainTex);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.shader.setUniformsValues({ terrainTex : 2, terrainMap : 1, terrainGrad : 0});

        // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

		
    }

    display() {
        this.scene.pushMatrix()
        this.appearance.apply();
        this.scene.setActiveShader(this.shader);
        this.terrainGrad.bind(0);        
        this.terrainMap.bind(1);
        this.terrainTex.bind(2);

        
        //estas duas linhas não estão a dar e nem sei bem o que fazem honestamente
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);

        this.scene.scale(60, 60, 60);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

}