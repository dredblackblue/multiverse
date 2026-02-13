export class FrameController {
  constructor() {
    this.accumulator = 0
  }

  shouldRender(delta, targetFPS) {
    const frameStep = 1 / targetFPS
    this.accumulator += delta

    if (this.accumulator >= frameStep) {
      this.accumulator = 0
      return true
    }
    return false
  }
}