import React, { useState } from 'react';
import PropTypes from 'prop-types';
const math = require('mathjs');
function Inputonepoint({addvalue,addpost}) {
  const [x, setX] = useState("");
  const [fx,setFx] = useState("");
  function onChangex(e) {
      setX(e.target.value);
  }
  function onChangefx(e){
      setFx(e.target.value);
  }
  function onSubmit(){
      addvalue(x,fx);
      cal(x,fx);
  }
  function cal(x,fx){
    let xold,error=999,x1;
    const node1 = math.parse(fx);
    const code1 = node1.compile();
    while(error > 0.000001){
        xold = x1;
        let scope = {
            x : x1
        }
        x1 = code1.evaluate(scope);
        error = math.abs((x1-xold)/x1);
        error = error.toFixed(6);
        addpost(x1,error);
    }
  }
  return (
    <div className="Input">
      <div className="Input__header"></div>
      <input
        className="Input__field"
        type="text"
        value={x}
        onChange={onChangex}
      />
      <input
        className="Input__field"
        type="text"
        value={fx}
        onChange={onChangefx}
      />
      <input type = "submit" onClick ={onSubmit}/>
    </div>
  );
}

Inputonepoint.propTypes = {
    addvalue: PropTypes.func.isRequired,
    addpost: PropTypes.func.isRequired
  };
export default Inputonepoint;
