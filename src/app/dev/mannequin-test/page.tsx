"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { MannequinDebug } from '@/components/MannequinDebug'

export default function MannequinTestPage() {
    const [influences, setInfluences] = useState([0, 0, 0, 0, 0])

    const labels = ['0 (Male?)', '1 (Female?)', '2 (Muscular?)', '3 (Fat?)', '4 (Slim?)']

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Controls */}
            <div className="w-80 p-6 flex flex-col gap-4 border-r border-gray-700 overflow-y-auto">
                <h1 className="text-xl font-bold">Morph Target Tester</h1>
                <p className="text-xs text-gray-400">Kéo từng slider để xem morph target nào làm gì</p>

                {influences.map((val, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">{labels[i] ?? `Index ${i}`}</span>
                            <span className="text-green-400 font-mono">{val.toFixed(2)}</span>
                        </div>
                        <input
                            type="range" min={0} max={1} step={0.01}
                            value={val}
                            onChange={(e) => {
                                const next = [...influences]
                                next[i] = Number(e.target.value)
                                setInfluences(next)
                            }}
                            className="w-full accent-green-400"
                        />
                    </div>
                ))}

                <button
                    onClick={() => setInfluences([0, 0, 0, 0, 0])}
                    className="mt-4 py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 text-sm"
                >
                    Reset tất cả
                </button>

                <div className="mt-4 p-3 bg-gray-800 rounded text-xs font-mono text-gray-300">
                    <p className="text-gray-500 mb-1">morphTargetInfluences:</p>
                    [{influences.map(v => v.toFixed(2)).join(', ')}]
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1">
                <Canvas camera={{ fov: 45 }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <directionalLight position={[-5, 3, -2]} intensity={0.8} />
                    <Suspense fallback={null}>
                        <MannequinDebug influences={influences} />
                    </Suspense>
                    <OrbitControls />
                </Canvas>
            </div>
        </div>
    )
}