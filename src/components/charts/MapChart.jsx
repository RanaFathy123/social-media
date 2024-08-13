// import React from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import features from "../../data/features.json";

// const myFeatures = features.features;

// console.log(myFeatures);

// const MapChart = () => {
//   // console.log(features);
  
//   return (
//     <ComposableMap>
//       <Geographies geography={myFeatures}>
//         {({ geographies }) =>
//           geographies.map((geo) => (
//             <Geography key={geo.rsmKey} geography={geo} />
//           ))
//         }
//       </Geographies>
//     </ComposableMap>
//   );
// };

// export default MapChart;




///////////////////////////////Version_2/////////////////////////////////


import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import features from "../../data/features.json";

const MapChart = () => {
  return (
    <ComposableMap>
      <Geographies geography={features.features}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
