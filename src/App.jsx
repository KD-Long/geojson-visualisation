// App.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './style.css';
import Experience from './Experience.jsx';
import Panel from './Panel';

import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'

export default function App() {
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [mercatorData, setMercatorData] = useState(null);

    //this component updates state when Panel code changes
    const handleGeoJsonChange = (newGeoJsonData) => {
        setGeoJsonData(newGeoJsonData);
    };

        //this component updates state when Panel code calculates Mercator values
    const handleMercatorChange = (MercatorData) => {
        console.log('Mercator data updated :)')
        setMercatorData(MercatorData);
        };

    const [sizes, setSizes] = useState([
        '80%',
        'auto',
    ]);

    const layoutCSS = {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    return (
        <div style={{ height: '100%' }}>
            <SplitPane
                split='vertical'
                sizes={sizes}
                onChange={setSizes}
            >
                <Pane minSize={50} maxSize='99%'>
                    <div style={{ ...layoutCSS, background: '#ddd' }}>
                        <Canvas
                            camera={{
                                fov: 45,
                                near: 0.1, 
                                far: 10000,
                                position: [0, 0, 300]
                            }}
                        >
                            <Experience geoJsonData={geoJsonData} mercatorData={mercatorData}/>
                        </Canvas>
                    </div>
                </Pane>
                <div style={{ ...layoutCSS, background: '#d5d7d9' }}>
                    {/* A side pannel div that has text and a option to provide a geoJson */}
                    <Panel onGeoJsonChange={handleGeoJsonChange} onMercator={handleMercatorChange}/>
                </div>

            </SplitPane>
        </div>

    );
}

