export const RGBShiftPass = {
  uniforms: {
    tDiffuse: { value: null }
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
    varying vec2 vUv;

    void main(){
      float offset = 0.003;

      float r = texture2D(tDiffuse, vUv + vec2(offset,0.0)).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - vec2(offset,0.0)).b;

      gl_FragColor = vec4(r,g,b,1.0);
    }
  `
}