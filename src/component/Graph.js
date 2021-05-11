import React from 'react';
import functionPlot from "function-plot";
const math = require('mathjs');
function Graph({xx}){
  function x() {
    let width = 400;
    let height = 500;
    functionPlot({
      target: "#tt",
      width,
      height,
      yAxis: { domain: [-1, 9] },
      grid: true,
      data: [
        {
          fn:xx,
        }
      ]
    });
  }
      return(
        <div className="App">
      <button onClick={x}>Draw</button>
      <div id="tt"></div>
    </div>
    )
}
// Graph.propTypes = {
//     ex: PropTypes.string.isRequired,
//   };
export default Graph;