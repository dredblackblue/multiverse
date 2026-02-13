export class TransitionManager {

  constructor(uniforms) {
    this.uniforms = uniforms
    this.active = false
    this.progress = 0
  }

  trigger() {
    this.active = true
    this.progress = 0
  }

  update(delta) {
    if (!this.active) return

    this.progress += delta * 3.5

    // violent ramp
    const intensity =
      Math.sin(this.progress * Math.PI) *
      (1.0 - this.progress)

    this.uniforms.intensity.value = Math.max(intensity, 0)

    if (this.progress >= 1) {
      this.active = false
      this.uniforms.intensity.value = 0
    }
  }
}