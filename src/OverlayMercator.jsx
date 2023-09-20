import { useEffect } from "react";
import { useState } from 'react'


export default function OverlayMercator({mercatorData}){


    const [geo, setGeo] = useState();

    useEffect(() => {
        // You can use the geoJsonData here when it changes
        if (mercatorData) {
          setGeo(mercatorData)
        }
        console.log("useEffect triggered by MERCATOR json change")
      }, [mercatorData]);




    console.log(mercatorData)
    return <>





        <mesh>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial  color="#0000ff" transparent={false} opacity={1}/>
        </mesh>


        {!geo ? null : (
            geo.features.map((feature, index) => {
                // console.log(feature.geometry.coordinates.flat(4))
                //  coordinates looksl ike: [x1,y1,z1,x2,y2,z2...]
                const verticies = feature.geometry.coordinates.flat(4)
                const positionAttribute = new Float32Array(verticies);

                return ( 
                    <lineSegments
                        key={index}
                    >
                        <bufferGeometry>
                            <bufferAttribute attach="attributes-position" args={[positionAttribute, 3]} />
                            <lineBasicMaterial color="black"  />
                        </bufferGeometry>
                    </lineSegments> 
                )
            })
        )
        }
    </>
}



{/* <lineSegments
key={index}
//TODO

// its not working cos i need to pass a geometry like a buffer geometry here like lesson 43 custom object
// geometry={new THREE.SphereGeometry(1, 16, 16)}******

geometry={[[0.87149573611111, -11.8665191467832, 0]]} //// i 
>
<lineBasicMaterial color='#ffff00' />
</lineSegments> */}




// line string -> flat(1)
// if we flat this whole thing to [x1,y1,z1,x2,y2,z2...] it works

// polygon     -> flat(2)
// if we flat this whole thing to [x1,y1,z1,x2,y2,z2...] it works

// multi polygon -> flat(3) - or call on sub items
// Need to be able to seperate polygons so they dont get drawn together
// lets try the flat pack first and change later

// function Segments({ points, color }) {
//     const vertices = points.map(v => new three.Vector3(...v));
  
//     return (
//       <lineSegments>
//         <geometry
//           attach="geometry"
//           vertices={vertices}
//           onUpdate={self => (self.verticesNeedUpdate = true)}
//         />
//         <lineBasicMaterial attach="material" color={color} />
//       </lineSegments>
//     );
//   }