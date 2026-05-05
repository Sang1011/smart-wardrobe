import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'

export function MannequinDebug({ influences }: { influences: number[] }) {
    const groupRef = useRef<THREE.Group>(null)
    const { scene } = useGLTF('/mannequin.glb')
    const { camera } = useThree()

    // Setup camera once
    useEffect(() => {
        scene.position.set(0, 0, 0)
        scene.updateMatrixWorld(true)

        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        if (groupRef.current) {
            groupRef.current.position.set(-center.x, -center.y, -center.z)
        }

        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
        const camZ = (maxDim / (2 * Math.tan(fov / 2))) * 1.6

        camera.position.set(0, 0, camZ)
        camera.lookAt(0, 0, 0)
        camera.updateProjectionMatrix()

        // Log morph target info
        scene.traverse((child) => {
            const mesh = child as THREE.SkinnedMesh
            if (mesh.morphTargetDictionary) {
                console.log(`Mesh: ${mesh.name}`)
                console.log('Dictionary:', mesh.morphTargetDictionary)
                console.log('Count:', mesh.morphTargetInfluences?.length)
            }
        })
    }, [scene, camera])

    // Apply influences on every change
    useEffect(() => {
        scene.traverse((child) => {
            const mesh = child as THREE.SkinnedMesh
            if (!mesh.morphTargetInfluences) return

            influences.forEach((val, i) => {
                if (i < mesh.morphTargetInfluences!.length) {
                    mesh.morphTargetInfluences![i] = val
                }
            })
        })
    }, [influences, scene])

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    )
}