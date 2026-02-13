export class TypographySystem {

  constructor() {
    this.textElements = []
    this.currentType = -1
  }

  init() {
    this.textElements = document.querySelectorAll("h2, button")

    if (!this.textElements.length) {
      console.warn("TypographySystem: No text elements found.")
    }
  }

  apply(worldType) {

    if (!this.textElements.length) return
    if (this.currentType === worldType) return

    this.currentType = worldType

    this.textElements.forEach(el => {

      // Reset
      el.style.transform = "none"
      el.style.textShadow = "none"
      el.style.letterSpacing = "4px"
      el.style.mixBlendMode = "normal"

      switch(worldType) {

        case 0:
          el.style.fontFamily = `"Playfair Display", serif`
          el.style.color = "#ffffff"
          el.style.textShadow = "0 0 20px rgba(255,255,255,0.4)"
          break

        case 1:
          el.style.fontFamily = `"Bebas Neue", sans-serif`
          el.style.color = "#ffffff"
          el.style.textShadow = "0 0 25px #ff00ff, 0 0 50px #00ffff"
          break

        case 2:
          el.style.fontFamily = `"Orbitron", sans-serif`
          el.style.color = "#ff0033"
          el.style.textShadow = "0 0 40px red"
          break

        case 3:
          el.style.fontFamily = `"Cinzel", serif`
          el.style.color = "#ffd700"
          el.style.textShadow = "0 0 25px rgba(255,200,0,0.8)"
          break

        case 4:
          el.style.fontFamily = `"Oswald", sans-serif`
          el.style.color = "#39ff14"
          el.style.textShadow = "0 0 25px #39ff14"
          break

        case 5:
          el.style.fontFamily = `"Share Tech Mono", monospace`
          el.style.color = "#ffffff"
          el.style.textShadow = "0 0 15px white"
          break
      }

    })
  }
}