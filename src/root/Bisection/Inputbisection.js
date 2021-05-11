import React, { useState } from 'react';
import PropTypes from 'prop-types';
import functionPlot from "function-plot";
const math = require('mathjs');
function Inputbisection({addvalue,addpost}) {
  const [xl, setXl] = useState("");
  const [xr,setXr] = useState("");
  const [fx,setFx] = useState("");
  function onChangexl(e) {
      setXl( e.target.value);
  }
  function onChangexr(e){
      setXr(e.target.value);
  }
  function onChangefx(e){
      setFx(e.target.value);
  }
  function onSubmit(){
      addvalue(xl,xr,fx);
      cal(xl,xr,fx);
  }
  function cal(xl1,xr1,fx){
    let fxl,fxr,fxm,xm,oldxm,error=0;
    const node1 = math.parse(fx);
    const code1 = node1.compile();
    let xl = parseFloat(xl1);
    let xr = parseFloat(xr1);
    xm = (xr+xl)/2;
    let scope1 = {
        x : xl
    }
    xl = parseFloat(xl);
    xr = parseFloat(xr);
    fxl = code1.evaluate(scope1);
    let scope2 = {
        x : xr
    }
    fxr = code1.evaluate(scope2)
    let scope3 = {
        x : xm
    }
    fxm = code1.evaluate(scope3)
    let sum;
    sum = fxm*fxr;
    if(sum > 0){
        xr = xm;
    }
    else{
        xl = xm
    }
    error = 1;
    while(error > 0.000001){
        oldxm = xm;
        let scope1 = {
            x : xl
        }
        fxl = code1.evaluate(scope1);
        let scope2 = {
            x : xr
        }
        fxr = code1.evaluate(scope2);
        xm = (xr+xl)/2
        let scope3 = {
            x : xm
        }
        fxm = code1.evaluate(scope3);
        sum = fxm * fxr;
        if(sum>0){
            xr = xm;
        }
        else{
            xl = xm;
        }
        xl = parseFloat(xl);
        xr = parseFloat(xr);
        error = math.abs((xm-oldxm)/xm);
        error = error.toFixed(6);
        addpost(xl,xm,error);
    }
  }
  return (
    <div className="Input">
      <div className="Input__header"></div>
      <input
        className="Input__field"
        type="text"
        value={xl}
        onChange={onChangexl}
      />
      <input
        className="Input__field"
        type="text"
        value={xr}
        onChange={onChangexr}
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

Inputbisection.propTypes = {
    addvalue: PropTypes.func.isRequired,
    addpost: PropTypes.func.isRequired
  };
export default Inputbisection;
