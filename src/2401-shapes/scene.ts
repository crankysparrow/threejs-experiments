import '../style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import World from '../utils/World'
import Sizes from '../utils/Sizes'
import GUI from 'lil-gui'

THREE.ColorManagement.enabled = true

const sizes = new Sizes()
const world = new World(sizes)
const clock = new THREE.Clock()
const gui = new GUI()

world.camera.position.set(0, 6, 4)
world.renderer.outputColorSpace = THREE.SRGBColorSpace
world.controls.zoomSpeed = 0.5

/**
 * Loaders
 */

const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()

/**
 * Textures & Materials
 */

const bakedTexture = textureLoader.load('./bakehouse2.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

const lampMaterial = new THREE.MeshBasicMaterial({
   color: '#ffe7db',
})
const windowMaterial = new THREE.MeshBasicMaterial({
   color: '#fff3d6',
})

/**
 * Model
 */
gltfLoader.load('./house2.glb', (gltf) => {
   console.log(gltf)

   const children = gltf.scene.children
   const emissionWindow = children.find((child) => child.name === 'emissionWindow')
   const emissionRoundWindow = children.find((child) => child.name === 'emissionRoundWindow')
   const emissionLamp = children.find((child) => child.name === 'emissionLamp')
   gltf.scene.traverse((child) => {
      child instanceof THREE.Mesh && (child.material = bakedMaterial)
   })

   if (emissionLamp instanceof THREE.Mesh) {
      emissionLamp.material = lampMaterial
   }
   if (emissionWindow instanceof THREE.Mesh) {
      emissionWindow.material = windowMaterial
   }
   if (emissionRoundWindow instanceof THREE.Mesh) {
      emissionRoundWindow.material = windowMaterial
   }

   world.scene.add(gltf.scene)
})

/**
 * GUI
 */

const debg = {
   clearColor: '#ffffff',
   windowColor: windowMaterial.color.getHexString(),
   lampColor: lampMaterial.color.getHexString(),
}
world.renderer.setClearColor(debg.clearColor)

gui.addColor(debg, 'clearColor').onChange((val: string) => {
   world.renderer.setClearColor(val)
})
gui.addColor(debg, 'windowColor').onChange((val: string) => {
   windowMaterial.color.set(val)
})
gui.addColor(debg, 'lampColor').onChange((val: string) => {
   lampMaterial.color.set(val)
})

const animate = () => {
   const time = clock.getElapsedTime()

   world.render()

   window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
