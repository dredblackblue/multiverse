import * as THREE from "three"

export class PaletteSystem {
  constructor(uniforms) {
    this.uniforms = uniforms
  }

  apply(world) {
    this.uniforms.colorA.value = new THREE.Color(world.colorA)
    this.uniforms.colorB.value = new THREE.Color(world.colorB)
    this.uniforms.worldType.value = world.type
  }
}