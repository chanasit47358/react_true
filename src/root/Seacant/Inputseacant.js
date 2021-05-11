import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { derivative, e } from 'mathjs';
const math = require('mathjs');
function Inputnewton({ addvalue, addpost }) {
  const [x,setX] = useState("");
  const [x1,setX1] = useState("");
  const [fx,setFx] = useState("");
  function onChangex(e) {
    setX(e.target.value);
  }
  function onChangefx(e) {
    setFx(e.target.value);
  }
  function onChangeX1(e) {
    setX1(e.target.value);
  }
  function onSubmit() {
    addvalue(x,x1,fx);
    cal(x,x1,fx);
  }
  function cal(x,x1, fx) {
      let error = 1;
      let x2;
      let node1 = math.parse(fx);
    let code1 = node1.compile();
    while(error > 0.000001){
        let scopex ={
            x:x
        }
        let scopx1 = {
            x:x1
        }
        let sum = (x1-x)/(code1.evaluate(scopx1)-code1.evaluate(scopex))
        x2 = x-code1.evaluate(scopex)*sum
        x = x1;
        x1 = x2;
        error = math.abs((x1-x)/x1);
        error = error.toFixed(6);
        addpost(x,x1,error)
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
        value={x1}
        onChange={onChangeX1}
      />
      <input
        className="Input__field"
        type="text"
        value={fx}
        onChange={onChangefx}
      />
      <input type="submit" onClick={onSubmit} />
    </div>
  );
}

Inputnewton.propTypes = {
  addvalue: PropTypes.func.isRequired,
  addpost: PropTypes.func.isRequired
};
export default Inputnewton;
