export default function Placeholder(props) {


    // Takes all props from parent and destructures and applies them to mesh
    return <mesh {...props} >
        <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
        <meshBasicMaterial wireframe color={'red'} />
    </mesh>
}