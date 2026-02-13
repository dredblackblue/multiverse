export const EdgeShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: null }
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
    uniform vec2 resolution;
    varying vec2 vUv;

    void main(){
      float dx = 1.0 / resolution.x;
      float dy = 1.0 / resolution.y;

      vec3 c = texture2D(tDiffuse, vUv).rgb;
      vec3 r = texture2D(tDiffuse, vUv + vec2(dx,0.0)).rgb;
      vec3 u = texture2D(tDiffuse, vUv + vec2(0.0,dy)).rgb;

      float edge = length(c - r) + length(c - u);

      vec4 base = texture2D(tDiffuse, vUv);
      gl_FragColor = mix(base, vec4(0.0,0.0,0.0,1.0), edge * 3.0);
    }
  `
}