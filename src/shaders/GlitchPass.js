export const GlitchPass = {
  uniforms: {
    tDiffuse: { value: null },
    intensity: { value: 0.0 }
  },

  vertexShader: `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,

  fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float intensity;
        varying vec2 vUv;

        void main() {

        vec2 uv = vUv;

        if(intensity > 0.0) {
            float yBand = floor(vUv.y * 20.0) / 20.0;
            uv.x += sin(yBand * 200.0) * 0.1 * intensity;

            if(fract(vUv.y * 30.0) > 0.95) {
            uv.x += 0.2 * intensity;
            }
        }

        vec4 color = texture2D(tDiffuse, uv);
        gl_FragColor = color;
        }
  `
}