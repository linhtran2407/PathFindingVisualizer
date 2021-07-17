// import React from 'react'
// import './App.css'
// import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';

// function App() {
//   return (
//     <div className="App">
//       <PathFindingVisualizer></PathFindingVisualizer>
//     </div>
//   );
// }

// export default App;

const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => {
  console.log("The server is up and running!");
});

