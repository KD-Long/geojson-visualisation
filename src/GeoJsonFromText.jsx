import React from "react";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { useState, useRef } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber'

export default function GeoJsonFromText({ geoJsonData }) {

    const [geo, setGeo] = useState(null);
    const groupRef = useRef()

    const { camera } = useThree();
    const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(0, 0, 500));

    // Calculate camera position based on the point to look through and camera distance
    const calculateCameraPosition = (pointToLookThrough, cameraDistance) => {
        const directionVector = pointToLookThrough.clone().normalize();
        return directionVector.multiplyScalar(cameraDistance);
    };


    // NOTE*** even if data doesnt change between submits this will still trigger every time submit is pressed
    useEffect(() => {
        // You can use the geoJsonData here when it changes
 
        if (geoJsonData) {
            setGeo(geoJsonData)
        }
        console.log("useEffect triggered by json change")

    }, [geoJsonData]);

    useEffect(() => {
    
        // checks or geo three js obj exists before modifying camera
        if(groupRef.current.children.length > 0){

              const bbox = new THREE.Box3().setFromObject(groupRef.current);
              const center = new THREE.Vector3( 0, 0, 0 );
              bbox.getCenter(center) // coppies result of .get center into center vector

            // Recalulates camera to look at center of json
            const pointToLookThrough = center
            const newCameraPosition = calculateCameraPosition(pointToLookThrough, 300);
            setCameraPosition(newCameraPosition);
            // Set the camera's position
            camera.position.copy(newCameraPosition);
        
            // Make the camera look at the center of the scene (0, 0, 0)
            camera.lookAt(0, 0, 0);
        
            // Update the camera's projection matrix
            camera.updateProjectionMatrix();

        }

    } , [geo])



    useFrame((state, delta) => {

        let firstSegment = groupRef.current.children[0]
        if (firstSegment) {
            const bs = firstSegment.geometry.boundingSphere

            if (bs) {
                // console.log(bs.center)
                //state.camera.lookAt(bs.center)
            }
        }



    })

    return <group ref={groupRef}>
        {!geo ? null : (
            geo.features.map((feature, index) => {
                return (
                    <lineSegments
                        key={index}
                        geometry={new GeoJsonGeometry(feature.geometry, 100, 1)}
                    >
                        <lineBasicMaterial color='#ff0000' />
                    </lineSegments>
                )
            })
        )
        }
    </group>

}

const resetCamera = () => {


    // Example point to look through and into (0, 0, 0)
    const pointToLookThrough = new THREE.Vector3(42.71574115753174, -54.03605079650879, -72.00783157348633);


    const cameraDistance = 300; // Distance between camera and point

    // Calculate the direction vector from (0, 0, 0) to pointToLookThrough
    const directionVector = pointToLookThrough.clone().normalize();

    // Scale the direction vector by cameraDistance to position the camera
    const cameraPosition = directionVector.multiplyScalar(cameraDistance);

    state.camera.position.copy(cameraPosition);

    state.camera.lookAt(0, 0, 0);
}