#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(terrainTex, vTextureCoord);
	vec4 filter = texture2D(terrainMap, vTextureCoord);

	//color.rgb -= vec3(0.3,0.3,0.3)*filter.b; 

	gl_FragColor = color;
}