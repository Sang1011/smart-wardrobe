import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'

export interface BodyProfile {
    bodySize: number;     // 0–1 → morph[0]
    fatDist: number;      // 0–1 → morph[1]
    muscleTone: number;   // 0–1 → morph[2]
    height: number;       // cm
}

// Hàm chỉ căn camera 1 lần (không tự động refit khi height thay đổi)
function fitCameraOnce(group: THREE.Group, camera: THREE.Camera) {
    const box = new THREE.Box3().setFromObject(group)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const cam = camera as THREE.PerspectiveCamera
    const fov = cam.fov * (Math.PI / 180)
    const camZ = (maxDim / (2 * Math.tan(fov / 2))) * 1.6
    cam.position.set(0, 0, camZ)
    cam.lookAt(0, 0, 0)
    cam.updateProjectionMatrix()
}

export function Mannequin({ profile }: { profile: BodyProfile }) {
    const groupRef = useRef<THREE.Group>(null)
    const { scene } = useGLTF('/mannequin.glb')
    const { camera } = useThree()
    const cameraFitDone = useRef(false)

    // ── Căn camera một lần khi mount ────────────────────────────────
    useEffect(() => {
        if (!groupRef.current || cameraFitDone.current) return
        groupRef.current.position.set(0, 0, 0)
        fitCameraOnce(groupRef.current, camera)
        cameraFitDone.current = true
    }, [camera])

    // ── Áp dụng morph + scale height trên bone gốc ──────────────────
    useEffect(() => {
        if (!groupRef.current) return;

        const { bodySize, fatDist, muscleTone, height } = profile;

        // Reset group scale
        groupRef.current.scale.set(1, 1, 1);

        // Tìm bone gốc bằng tên
        let rootBone = scene.getObjectByName('_rootJoint') as THREE.Bone | null;
        if (!rootBone) rootBone = scene.getObjectByName('Hip_Bone_00') as THREE.Bone | null;

        if (rootBone) {
            const heightScale = 0.9 + ((height - 140) / 80) * 0.4;
            rootBone.scale.set(1, heightScale, 1);
            rootBone.updateMatrixWorld(true);
        } else {
            console.warn('Không tìm thấy bone gốc để scale chiều cao');
        }

        // Morph targets
        scene.traverse((child) => {
            const mesh = child as THREE.SkinnedMesh;
            if (!mesh.morphTargetInfluences) return;
            const inf = mesh.morphTargetInfluences;
            for (let i = 0; i < inf.length; i++) inf[i] = 0;
            if (inf.length > 0) inf[0] = Math.min(bodySize, 0.85);
            if (inf.length > 1) inf[1] = Math.min(fatDist, 1.0);
            if (inf.length > 2) inf[2] = Math.min(muscleTone, 1.0);
        });
    }, [profile, scene]);

    // ── Center group (chỉ một lần) ─────────────────────────────────
    useEffect(() => {
        if (!groupRef.current) return
        const box = new THREE.Box3().setFromObject(groupRef.current)
        const center = box.getCenter(new THREE.Vector3())
        groupRef.current.position.sub(center)
        fitCameraOnce(groupRef.current, camera)
    }, [camera])

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    )
}