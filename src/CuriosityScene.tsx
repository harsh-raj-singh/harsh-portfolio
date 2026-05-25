import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type CuriositySceneProps = {
  activeColor: string
  activeIndex: number
}

const fieldColors = ['#f6f7f2', '#111111', '#ff5a1f', '#0bb7ff', '#38c172', '#f2c94c', '#e94b7a']

function seeded(index: number) {
  const x = Math.sin(index * 9281.17) * 43758.5453
  return x - Math.floor(x)
}

export function CuriosityScene({ activeColor, activeIndex }: CuriositySceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80)
    camera.position.set(0, 0.35, 7.6)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const root = new THREE.Group()
    scene.add(root)

    const softLight = new THREE.HemisphereLight('#ffffff', '#2f3c2d', 2.4)
    scene.add(softLight)

    const keyLight = new THREE.DirectionalLight(activeColor, 2.6)
    keyLight.position.set(-2, 4, 5)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight('#ffffff', 1.7)
    rimLight.position.set(3, -2, 4)
    scene.add(rimLight)

    const paperGroup = new THREE.Group()
    const ringGroup = new THREE.Group()
    root.add(paperGroup)
    root.add(ringGroup)

    const palette = [activeColor, ...fieldColors]
    const papers: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>[] = []

    for (let index = 0; index < 26; index += 1) {
      const width = 0.52 + seeded(index + activeIndex * 3) * 0.85
      const height = 0.2 + seeded(index + 40) * 0.38
      const geometry = new THREE.PlaneGeometry(width, height, 12, 6)
      const position = geometry.attributes.position as THREE.BufferAttribute

      for (let point = 0; point < position.count; point += 1) {
        const x = position.getX(point)
        const y = position.getY(point)
        position.setZ(point, Math.sin(x * 4 + index) * 0.035 + Math.cos(y * 7 + activeIndex) * 0.025)
      }

      geometry.computeVertexNormals()

      const material = new THREE.MeshStandardMaterial({
        color: palette[index % palette.length],
        side: THREE.DoubleSide,
        roughness: 0.72,
        metalness: 0.02,
        transparent: true,
        opacity: index % 5 === 0 ? 0.55 : 0.9,
      })

      const mesh = new THREE.Mesh(geometry, material)
      const radius = 1.45 + seeded(index + 11) * 3.8
      const angle = (index / 26) * Math.PI * 2 + activeIndex * 0.17

      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, -seeded(index + 19) * 3.2)
      mesh.rotation.set(seeded(index + 7) * Math.PI, seeded(index + 13) * Math.PI, angle)
      mesh.userData.spin = 0.0018 + seeded(index + 31) * 0.004
      mesh.userData.float = 0.32 + seeded(index + 43) * 0.52
      mesh.userData.seed = seeded(index + 53) * Math.PI * 2
      paperGroup.add(mesh)
      papers.push(mesh)
    }

    for (let index = 0; index < 5; index += 1) {
      const radius = 1.15 + index * 0.76
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.006, 8, 160),
        new THREE.MeshBasicMaterial({
          color: index % 2 === 0 ? activeColor : '#111111',
          transparent: true,
          opacity: 0.18,
        }),
      )
      torus.rotation.x = Math.PI / 2.6
      torus.rotation.y = index * 0.18
      ringGroup.add(torus)
    }

    const pointer = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', onResize)

    const startedAt = performance.now()
    let raf = 0

    const animate = () => {
      const time = (performance.now() - startedAt) / 1000
      root.rotation.y = Math.sin(time * 0.12) * 0.18 + pointer.x * 0.09
      root.rotation.x = -0.1 + pointer.y * 0.06
      paperGroup.rotation.z = time * 0.035
      ringGroup.rotation.z = -time * 0.05

      papers.forEach((paper, index) => {
        paper.rotation.z += paper.userData.spin
        paper.position.y += Math.sin(time * paper.userData.float + paper.userData.seed) * 0.0022
        paper.material.opacity = 0.62 + Math.sin(time * 0.8 + index) * 0.16
      })

      camera.position.x += pointer.x * 0.45 - camera.position.x * 0.04
      camera.position.y += 0.35 + pointer.y * 0.22 - camera.position.y * 0.04
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      raf = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      papers.forEach((paper) => {
        paper.geometry.dispose()
        paper.material.dispose()
      })
      ringGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>
        mesh.geometry.dispose()
        mesh.material.dispose()
      })
      renderer.dispose()
    }
  }, [activeColor, activeIndex])

  return <canvas ref={canvasRef} className="curiosity-canvas" aria-hidden="true" />
}
