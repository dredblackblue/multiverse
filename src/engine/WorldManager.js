export class WorldManager {

  constructor(worlds, paletteSystem, typography) {
    this.worlds = worlds
    this.index = 0
    this.palette = paletteSystem
    this.typography = typography

    this.current = this.worlds[this.index]
    this.applyCurrent()
  }

  next() {
    this.index = (this.index + 1) % this.worlds.length
    this.current = this.worlds[this.index]
    this.applyCurrent()
  }

  applyCurrent() {
    this.palette.apply(this.current)
    if (this.typography) {
      this.typography.apply(this.current.type)
    }
  }
}