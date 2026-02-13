export const HalftoneShader = {
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
      vec4 color = texture2D(tDiffuse, vUv);
      float gray = dot(color.rgb, vec3(0.299,0.587,0.114));

      vec2 uv = vUv * resolution / 6.0;
      float pattern = sin(uv.x) * sin(uv.y);
      float dots = step(pattern, gray);

      gl_FragColor = vec4(color.rgb * dots, 1.0);
    }
  `
}