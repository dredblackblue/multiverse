import * as THREE from "three"

export class ParallaxSystem {

  constructor(scene, baseMaterial) {

    this.scene = scene
    this.layers = []
    this.baseMaterial = baseMaterial

    // We already have one base quad in main.js
    // So we create 2 additional background depth layers

    const layerCount = 2

    for (let i = 1; i <= layerCount; i++) {

      // 🔥 Proper deep clone of uniforms
      const clonedUniforms = THREE.UniformsUtils.clone(
        baseMaterial.uniforms
      )

      const material = new THREE.ShaderMaterial({
        uniforms: clonedUniforms,
        vertexShader: baseMaterial.vertexShader,
        fragmentShader: baseMaterial.fragmentShader,
        transparent: true
      })

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 2.2), // slightly larger for depth illusion
        material
      )

      // Push backward in Z
      mesh.position.z = -i * 0.2

      // Slight scale difference per layer
      mesh.scale.setScalar(1 + i * 0.05)

      // Slight opacity fade for depth
      mesh.material.opacity = 0.9 - i * 0.15

      scene.add(mesh)
      this.layers.push(mesh)
    }
  }

  update(time, worldUniforms) {

    this.layers.forEach((layer, i) => {

      // Animate time differently per layer
      layer.material.uniforms.time.value =
        time * (1 + i * 0.3)

      // 🔥 Sync worldType + colors properly
      layer.material.uniforms.worldType.value =
        worldUniforms.worldType.value

      layer.material.uniforms.colorA.value.copy(
        worldUniforms.colorA.value
      )

      layer.material.uniforms.colorB.value.copy(
        worldUniforms.colorB.value
      )
    })
  }
}