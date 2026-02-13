export const PortalShader = {
  uniforms: {
    tDiffuse: { value: null },
    progress: { value: 0.0 }
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
    uniform float progress;
    varying vec2 vUv;

    void main(){
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float ripple = smoothstep(progress, progress + 0.25, dist);

      vec2 distorted = vUv + (vUv - center) * ripple * 0.25;
      distorted = clamp(distorted, 0.0, 1.0);

      gl_FragColor = texture2D(tDiffuse, distorted);
    }
  `
}