import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Placeholder from './Placeholder'
import Sphere from './Sphere'
import OverlayMercator from './OverlayMercator.jsx'
import SphereGeoMap from './SphereGeoMap'
import Panel from './Panel'
import GeoJsonFromText from './GeoJsonFromText'



export default function Experience({geoJsonData,mercatorData}) {



    return <>

        <Perf position="bottom-left" />
        <OrbitControls makeDefault />
        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={0.04} />
        <ambientLight intensity={0.9} />




        {/* SHERE */}


        <Sphere />


        {/* DRAW GEOJSON ON SPHERE */}
        <SphereGeoMap />


        {/* DRAW GEOJSON from text */}
        <GeoJsonFromText geoJsonData={geoJsonData} />


        {/* <OverlayMercator mercatorData={mercatorData} /> */}
   

    </>
}