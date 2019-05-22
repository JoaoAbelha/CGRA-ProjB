attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D terrainMap;

void main() {

    vTextureCoord = aTextureCoord;
    vec4 filter = texture2D(terrainMap, vTextureCoord);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x, aVertexPosition.y , aVertexPosition.z + filter.r * 0.3, 1.0);
}