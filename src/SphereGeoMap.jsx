import React from "react";
import { useEffect } from "react";
import { useState } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry';

export default function SphereGeoMap() {

    //get the data with function

    //will need to store data feom fetch with useState

    // need to call a once off request to get the data when onject initiated
    //    -> useEffect [] with no dependencies


    //convert data into three geometry with GeoJsonGeometry(geometry)
    // const myLine = new THREE.Line(
    //     new THREE.GeoJsonGeometry(geoJson),
    //     new THREE.LineBasicMaterial({ color: 'blue' })
    // );

    // probs need to do this in the jsx

    const [geo, setGeo] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    const getMapData = async () => {
        const response = await fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson')
        const result = await response.json()

        // set  value
        // result.feature looks like "{type: 'Feature', properties: {…}, geometry: {…}}"
        setGeo(result)
        // this used laterin jsx to only build object when data has loaded (preventing undefined)
        setIsloading(false)
        console.log('Fetch earth map complete')

    }

    // calls get getMapData() once on creation but not on object rerender 
    useEffect(() => {
        getMapData()
    }, [])



    return <>
        {!geo ? null : (
            geo.features.map((feature, index) => {
                return (
                    <lineSegments
                        key={index}
                        geometry={new GeoJsonGeometry(feature.geometry, 100)}
                    >
                        <lineBasicMaterial color='#000000' />
                    </lineSegments>
                )
            })
        )
        }
    </>

}