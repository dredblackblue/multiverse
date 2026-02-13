export const GrainShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0.0 }
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
    uniform float time;
    varying vec2 vUv;

    float random(vec2 co){
      return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
    }

    void main(){
      vec4 base = texture2D(tDiffuse, vUv);
      float noise = random(vUv + time) * 0.05;

      vec2 shift = vec2(0.002 * sin(time*5.0), 0.0);
      float r = texture2D(tDiffuse, vUv + shift).r;
      float g = base.g;
      float b = texture2D(tDiffuse, vUv - shift).b;

      gl_FragColor = vec4(r,g,b,1.0) + noise;
    }
  `
}