
export default function Sphere(){

    return <>
        <mesh>
            <sphereGeometry args={[100, 64, 64]} />
            <meshStandardMaterial  color="#666666" transparent={false} opacity={0.5}/>
        </mesh>
    </>
}


