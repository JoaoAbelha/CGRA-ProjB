#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTex;
uniform sampler2D terrainMap;
uniform sampler2D terrainGrad;

void main() {
	vec4 color = texture2D(terrainTex, vTextureCoord);
	vec4 filter = texture2D(terrainMap, vTextureCoord);
	

	float texCordT = (filter.r + filter.g + filter.b) / 3.0;
	vec4 gradient = texture2D(terrainGrad, vec2(0, 1.0 - texCordT));


	gl_FragColor = gradient * 0.5 + color * 0.5;
}