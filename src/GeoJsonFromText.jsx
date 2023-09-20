import React from "react";
import { useEffect } from "react";
import { useState } from 'react'
import { GeoJsonGeometry } from 'three-geojson-geometry';

export default function GeoJsonFromText({geoJsonData}) {

    const [geo, setGeo] = useState(null);


    // const getMapDataFromForm = () => {
    //     setGeo(geoJsonData)

    //     // this used laterin jsx to only build object when data has loaded (preventing undefined)
    //     setIsloading(false)
    //     console.log('Fetch from form complete')

    // }

    useEffect(() => {
        // You can use the geoJsonData here when it changes
        if (geoJsonData) {
          setGeo(geoJsonData)
        }
        console.log("useEffect triggered by json change")
      }, [geoJsonData]);


    return <>
        {!geo ? null : (
            geo.features.map((feature, index) => {
                return (
                    <lineSegments
                        key={index}
                        geometry={new GeoJsonGeometry(feature.geometry, 100,1)}
                    >
                        <lineBasicMaterial color='#ff0000' />
                    </lineSegments>
                )
            })
        )
        }
    </>

}