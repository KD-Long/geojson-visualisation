import * as THREE from 'three'
import {useMatcapTexture } from '@react-three/drei'


export default function Sphere(){
    const [matcapTexture] = useMatcapTexture('312D20_80675C_8B8C8B_85848C', 256)

    const material = new THREE.MeshMatcapMaterial()
    material.matcap = matcapTexture

    return <>
        <mesh
            material={material}
        >
            <sphereGeometry args={[100, 64, 64]} />
            {/* <meshStandardMaterial  color="#666666" transparent={false} opacity={0.5}/> */}
            {/* <meshNormalMaterial /> */}
        </mesh>
    </>
}


