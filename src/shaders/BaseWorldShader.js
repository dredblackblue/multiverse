export const BaseWorldShader = {
  uniforms: {
    time: { value: 0 },
    colorA: { value: null },
    colorB: { value: null },
    worldType: { value: 0 }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,

  fragmentShader: `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform int worldType;
    varying vec2 vUv;

    float random(vec2 p){
    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
    }

    void main(){

    vec3 color = vec3(0.0);

    // 🌸 Watercolor (Soft pastel waves)
    if(worldType == 0){
        float wave = sin(vUv.x*4.0 + time*1.5) * 0.2;
        float bleed = cos(vUv.y*3.0 - time*1.2) * 0.2;
        float mixVal = vUv.y + wave + bleed;

        color = mix(colorA, colorB, mixVal);
        color *= 1.1; // brighten
    }

    // ⚡ Neon Comic (Bold grid pulse)
    else if(worldType == 1){
        vec2 grid = fract(vUv * 30.0);
        float lines = step(0.95, grid.x) + step(0.95, grid.y);
        float pulse = abs(sin(time*4.0));

        color = mix(colorA, colorB, lines);
        color += pulse * 0.5; // glow pop
    }

    // 🔴 Cyberpunk (Red scan glitch)
    else if(worldType == 2){
        float scan = sin(vUv.y*600.0 + time*30.0)*0.08;
        float vertical = smoothstep(0.3,0.7,vUv.x + scan);

        color = mix(colorA, colorB, vertical);
        color *= 1.3;
    }

    // 🇮🇳 Vibrant India (Pattern burst)
    else if(worldType == 3){
        float pattern = abs(sin(vUv.x*8.0))*abs(cos(vUv.y*6.0));
        float shimmer = sin(time*5.0 + vUv.y*10.0)*0.1;

        color = mix(colorA, colorB, pattern + shimmer);
        color *= 1.2;
    }

    // 🎨 Graffiti (Spray splatter chaos)
    else if(worldType == 4){
        float splatter = random(vUv*300.0 + time*5.0);
        float drip = smoothstep(0.6,1.0,fract(vUv.y*12.0 - time*2.0));

        color = mix(colorA, colorB, splatter);
        color += drip * 0.5;
    }

    // 💻 Glitch (Digital block corruption)
    else {
        float band = floor(vUv.y*25.0)/25.0;
        float glitch = step(0.9, fract(band*10.0 + time*8.0));

        color = mix(colorA, colorB, glitch);
        color += random(vUv*time)*0.2;
    }

    gl_FragColor = vec4(color,1.0);
    }
    `
}