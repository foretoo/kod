import * as THREE from 'three'

export default function ThreeScene(sceneRef, isMobile) {

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 1
  camera.rotation.x = Math.PI / 3

  const renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setSize(window.innerWidth, window.innerHeight)
  sceneRef.appendChild(renderer.domElement)

  window.onresize = function () {
		const width = window.innerWidth
		const height = window.innerHeight
		camera.aspect = width / height
		renderer.setSize( width, height )
	}

  const starsPosBlue = new THREE.Geometry()
  const starsPosViolet = new THREE.Geometry()
  const starsPosUltra = new THREE.Geometry()

  function correct(x, z) {
    const l = Math.sqrt(Math.pow(Math.abs(x),2) + Math.pow(Math.abs(z),2))
    const d = (350 - l) / 350
    const k = d*2.5
    return [x*k, z*k]
  }
  function generateStarsPos(group) {
    for (let i = 0; i < 1000; i++) {
      let star
      if (i % 2 === 0) {
        star = new THREE.Vector3(
          Math.random() * 400 - 200,
          Math.random() * 1200 - 600,
          Math.random() * 400 - 200
        )
      } else {
        star = new THREE.Vector3(
          group.vertices[i-1].x,
          group.vertices[i-1].y,
          group.vertices[i-1].z
        )
      }
      star.velocity = 5
      star.acceleration = 0.05 * (Math.abs(star.x) + Math.abs(star.z)) / 200
      group.vertices.push(star)
    }
  }
  generateStarsPos(starsPosBlue)
  generateStarsPos(starsPosViolet)
  generateStarsPos(starsPosUltra)

  const starsMatlBlue = new THREE.LineBasicMaterial( { color: 0x4488aa, linewidth: 1 } )
  const starsMatViolet = new THREE.LineBasicMaterial( { color: 0x4477ee, linewidth: 1 } )
  const starsMatUltra = new THREE.LineBasicMaterial( { color: 0xaabbff, linewidth: 1 } )

  const starsBlue = new THREE.LineSegments(starsPosBlue, starsMatlBlue)
  const starsViolet = new THREE.LineSegments(starsPosViolet, starsMatViolet)
  const starsUltra = new THREE.LineSegments(starsPosUltra, starsMatUltra)
  scene.add(starsBlue)
  scene.add(starsViolet)
  scene.add(starsUltra)

  function updateStarsPos(group) {
    group.vertices.forEach((star, i) => {
      if (i % 2 === 0) {
        star.velocity += star.acceleration
      } else {
        if (star.y < -(100 + Math.random()*500)) {
          star.y = group.vertices[i-1].y = 100 + Math.random()*500
          star.x = Math.random() * 400 - 200
          star.z = Math.random() * 400 - 200
          const [x, z] = correct(star.x, star.z)
          star.x = group.vertices[i-1].x = x
          star.z = group.vertices[i-1].z = z
          star.velocity = group.vertices[i-1].velocity = 5
        }
      }
      star.y -= star.velocity
    })
    group.verticesNeedUpdate = true
  }
  function animate() {
    updateStarsPos(starsPosBlue)
    updateStarsPos(starsPosViolet)
    updateStarsPos(starsPosUltra)
    starsBlue.rotation.y += 0.001
    starsViolet.rotation.y += 0.0015
    starsUltra.rotation.y += 0.002
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()
}