import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import GeoJsonFromText from './GeoJsonFromText';
import { useState, useEffect, useMemo } from 'react';

import defaultData from './australian-states.json'


import {
  Button,
  Typography,
  Container,
  Box,

} from '@mui/material';




export default function Panel({ onGeoJsonChange, onMercator }) {

    //onGeoJsonChange is a function passed dowqn from parent we are using this to lift state upt to our canvas component

    const [geoBoxValue, setGeoBoxValue] = useState(JSON.stringify(defaultData)); // State to hold the GeoJSON value
    // Set this as the default value to aus states


    const onChange = React.useCallback((value, viewUpdate) => {
        // console.log('value:', value);
        // set the value ready to be lifted on button click
        setGeoBoxValue(value)
    }, []);

    // when on change is triggered I want to pass the result to my canvas and rerender
    const handleButtonClick = () => {

        // When the button is clicked, trigger the update using the current geoJsonValue
        // this will set state in App component
        let json;
        try {
            json = JSON.parse(geoBoxValue);
        } catch (e) {
            alert("That JSON syntax doesnt look quite right! Try the console for further details.");
            return console.error(e); // error in the above string (in this case, yes)!

        }
        // old approach replacing in geo json
        // // Convert the original GeoJSON to a JSON string
        // const jsonString = JSON.stringify(json);
        // // Scale the numbers in the JSON string
        // const scaledJSONString = scaleNumbersInJSON(jsonString,1);
        // // Parse the scaled JSON string back to a JavaScript object
        // const scaledGeoJSON = JSON.parse(scaledJSONString);

        //lifting state up to app to pass down to pannel
        // const jsonString = JSON.stringify(json);
        // const mercatorCoords =  scaleNumbersInJSON(jsonString)
        // const scaledGeoJSON = JSON.parse(mercatorCoords);
        // onMercator(scaledGeoJSON)
        // console.log(scaledGeoJSON)

        // Will only get to this code if Try is sucessfull

        onGeoJsonChange(json);
    }

    // Calculate bigest diameter
    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '16px',
        width: '50%',
        textAlign: 'center',
      };


    return <div className='panel'>
        <div className="playground-container">
            {/* <header>Add your own .geojson data.</header>

            <div className="center-button-container">
                <button className='sub-button' onClick={handleButtonClick}>Submit</button>
            </div> */}

            <header>Add your own .geojson data.</header>

                <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
                <Button variant="contained" style={buttonStyle} onClick={handleButtonClick}>
                    Submit
                </Button>
                </div>




            <div className="playground-panel">
                <CodeMirror
                    className="cm-outer-container"
                    value={"<-- insert geojson --> \n (Default Australia states)"}
                    extensions={[json()]}
                    onChange={onChange}

                />
            </div>
        </div>
    </div>
}

// // Function to scale numbers in a JSON string
// const scaleNumbersInJSON = (jsonString, scaleFactor=1) => {
//     return jsonString.replace(/-?\d+\.\d+/g, (match) => {
//         // Parse the matched number and scale it
//         const scaledNumber = parseFloat(match) * scaleFactor;
//         return scaledNumber.toString();
//     });
// };


// adjusted to return a array of coordinates
// const getCoodarr = (jsonString) => {
//     const regex = /-?\d+\.\d+\s*,\s*-?\d+\.\d+/g; // Regular expression to match decimal numbers
//     let res = []
//     const scaledJSON = jsonString.replace(regex, (match) => {
//       // Parse the matched number
//       const [longitude, latitude] = match.split(',').map(Number); // Assuming the numbers are separated by a comma
  
//       // Scale the latitude and longitude values
//       const [scaledLongitude, scaledLatitude] = latLngToMercator(longitude, latitude);

//       //making it 3d to put on plane
//       res.push([scaledLongitude, scaledLatitude,0])

//       // Return the scaled values as a string
//       return `[${scaledLongitude.toFixed(6)}, ${scaledLatitude.toFixed(6)}]`; // Format as [x, y]
//     });
//     // console.log(res)
//     // returns array of coordinate pairs
//     return res;
//   };


const scaleNumbersInJSON = (jsonString, scaleFactor=1) => {
    const regex = /-?\d+\.\d+\s*,\s*-?\d+\.\d+/g; // Regular expression to match decimal numbers
  
    const scaledJSON = jsonString.replace(regex, (match) => {
      // Parse the matched number
      const [longitude, latitude] = match.split(',').map(Number); // Assuming the numbers are separated by a comma
  
      // Scale the latitude and longitude values
      const [scaledLongitude, scaledLatitude] = latLngToMercator(longitude, latitude);
  
      // Return the scaled values as a string
      return `[${scaledLongitude.toFixed(14)}, ${scaledLatitude.toFixed(14)}, 0]`; // Format as [x, y, z]
    });
    
    return scaledJSON;
  };


// // Does the calc Mercator simplified for perfect sphere
function latLngToMercator(longitude, latitude) {
    const x = (longitude + 180) / 360;
    const y = Math.log(Math.tan((latitude + 90) * (Math.PI / 360))) / (Math.PI / 180);
    return [x, y]; // Return as an array [x, y]
  }

// // Recursive function to convert coordinates within anobject
// function convertObjectCoordinatesToMercator(obj) {
//     if (Array.isArray(obj)) {
//       // If obj is an array, recursively convert its elements
//       return obj.map((item) => convertObjectCoordinatesToMercator(item));
//     } else if (typeof obj === 'object' && obj !== null) {
//       if (Array.isArray(obj.coordinates)) {
//         // If "coordinates" property is an array, check if it's a MultiPolygon
//         if (Array.isArray(obj.coordinates[0][0])) {
//           // Convert the coordinates for each polygon in the MultiPolygon
//           obj.coordinates = obj.coordinates.map((polygon) =>
//             polygon.map(([longitude, latitude]) => latLngToMercator(longitude, latitude))
//           );
//         } else {
//           // Convert the coordinates for a single Polygon
//           obj.coordinates = obj.coordinates.map(([longitude, latitude]) =>
//             latLngToMercator(longitude, latitude)
//           );
//         }
//       }
//       // Recursively convert other properties
//       for (const key in obj) {
//         obj[key] = convertObjectCoordinatesToMercator(obj[key]);
//       }
//     }
//     return obj;
//   }
