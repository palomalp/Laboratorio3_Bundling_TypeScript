import React from "react";
//ReactDOM, como interactúa react con una aplicación web:
import ReactDOM from "react-dom";
import { AverageComponent } from "./averageComponent";
import { TotalScoreComponent } from './totalScoreComponent';

const logoImg = require ('./content/logo_1.png');
const img = document.createElement('img');
img.src = logoImg;
document.getElementById('img').appendChild(img);

ReactDOM.render(
  <div>
    <h1>Hello from React DOM</h1>
    <AverageComponent />
    <TotalScoreComponent />
  </div>,
  document.getElementById("root")
);

