import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"

import { BaseWorldShader } from "./shaders/BaseWorldShader.js"
import { GlitchPass } from "./shaders/GlitchPass.js"
import { RGBShiftPass } from "./shaders/RGBShiftPass.js"
import { ScanlinePass } from "./shaders/ScanlinePass.js"

import { WorldManager } from "./engine/WorldManager.js"
import { TransitionManager } from "./engine/TransitionManager.js"
import { FrameController } from "./engine/FrameController.js"
import { PaletteSystem } from "./engine/PaletteSystem.js"
import { ParallaxSystem } from "./engine/ParallaxSystem.js"
import { TypographySystem } from "./engine/TypographySystem.js"

import watercolor from "./worlds/watercolor.js"
import neon from "./worlds/neon.js"
import cyberpunk from "./worlds/cyberpunk.js"
import india from "./worlds/india.js"
import graffiti from "./worlds/graffiti.js"
import glitch from "./worlds/glitch.js"

/* ---------------- Scene Setup ---------------- */

const scene = new THREE.Scene()

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
camera.position.z = 1

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

/* ---------------- Base Material ---------------- */

const baseMaterial = new THREE.ShaderMaterial(BaseWorldShader)

const quad = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  baseMaterial
)

scene.add(quad)

/* ---------------- Post Processing ---------------- */

const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))

const glitchPass = new ShaderPass(GlitchPass)
const rgbPass = new ShaderPass(RGBShiftPass)
const scanlinePass = new ShaderPass(ScanlinePass)

composer.addPass(glitchPass)
composer.addPass(rgbPass)
composer.addPass(scanlinePass)

scanlinePass.renderToScreen = true

/* ---------------- Engine Systems ---------------- */

const palette = new PaletteSystem(baseMaterial.uniforms)

const worlds = new WorldManager(
  [watercolor, neon, cyberpunk, india, graffiti, glitch],
  palette
)

const transition = new TransitionManager(glitchPass.uniforms)

const frameControl = new FrameController()

const parallax = new ParallaxSystem(scene, baseMaterial)
const typography = new TypographySystem()
typography.init()
/* ---------------- Auto Switching ---------------- */

setInterval(() => {
  worlds.next()
  typography.apply(worlds.current.type)
  transition.trigger()
}, 3000)
/* ---------------- Animation ---------------- */

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  if (frameControl.shouldRender(delta, worlds.current.frameRate)) {
    baseMaterial.uniforms.time.value += delta
    composer.render()
  }

  parallax.update(
    baseMaterial.uniforms.time.value,
    baseMaterial.uniforms
  )
}

animate()

/* ---------------- Resize ---------------- */

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
})