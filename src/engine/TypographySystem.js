export class TypographySystem {

  constructor() {
    this.text = null
    this.currentType = -1
  }

  init() {
    this.text =
      document.getElementById("text") ||
      document.querySelector("h2")

    if (!this.text) {
      console.warn("TypographySystem: No text element found.")
    }
  }

  apply(worldType) {

    if (!this.text) return
    if (this.currentType === worldType) return

    this.currentType = worldType

    // RESET EVERYTHING CLEANLY
    this.text.style.transform = "none"
    this.text.style.textShadow = "none"
    this.text.style.letterSpacing = "4px"
    this.text.style.mixBlendMode = "normal"

    switch(worldType) {

      case 0: // Watercolor
        this.text.style.fontFamily = `"Playfair Display", serif`
        this.text.style.color = "#ffffff"
        this.text.style.textShadow =
          "0 0 20px rgba(255,255,255,0.4)"
        break

      case 1: // Neon
        this.text.style.fontFamily = `"Bebas Neue", sans-serif`
        this.text.style.color = "#ffffff"
        this.text.style.textShadow =
          "0 0 25px #ff00ff, 0 0 50px #00ffff"
        break

      case 2: // Cyberpunk
        this.text.style.fontFamily = `"Orbitron", sans-serif`
        this.text.style.color = "#ff0033"
        this.text.style.textShadow =
          "0 0 40px red"
        break

      case 3: // India
        this.text.style.fontFamily = `"Cinzel", serif`
        this.text.style.color = "#ffd700"
        this.text.style.textShadow =
          "0 0 25px rgba(255,200,0,0.8)"
        break

      case 4: // Graffiti
        this.text.style.fontFamily = `"Oswald", sans-serif`
        this.text.style.color = "#39ff14"
        this.text.style.textShadow =
          "0 0 25px #39ff14"
        break

      case 5: // Glitch
        this.text.style.fontFamily = `"Share Tech Mono", monospace`
        this.text.style.color = "#ffffff"
        this.text.style.textShadow =
          "0 0 15px white"
        break
    }
  }
}