import React, { useState } from 'react';
import { Table,Button, Calendar, Input, Select } from 'antd';
import { det, log } from 'mathjs';
const math = require('mathjs');
let A = [],B = [],matrixA=[],matrixB=[];
function Gausseli() {
  const [dimention,setDimention] = useState('');
  const [number,setNumber] = useState([]);
  const [sinput,setSinput] = useState(true);
  const [sans,setSans] = useState(false);
  const [smatrix,setSmatrix] = useState(false);
  const [ans,setAns] = useState([]);
  const columns = [
    {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }
  ]
  function creatematrix(){
    for(let i =1;i<=dimention;i++){
      for(let j = 1;j<=dimention;j++){
        A.push(
          <Input
          style={{
            width: "5%",
            height: "5%",
            backgroundColor: "#06d9a0",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold"
        }}
        id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />
        )
      }
      B.push(
        <Input 
        style={{
          width: "5%",
          height: "5%",
          backgroundColor: "#06d9a0",
          marginInlineEnd: "5%",
          marginBlockEnd: "5%",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold"
      }}
      id={"b" + i} key={"b" + i} placeholder={"b" + i} />
      )      
      A.push(<br/>)
    }
    setSinput(false);
    setSmatrix(true);
  }
  function cal(){
    init();
    let tranform = JSON.parse(JSON.stringify(matrixA));
    let tranform1 = JSON.parse(JSON.stringify(matrixB));
    for(let i = 0;i<dimention ; i++){ // column
    for(let j = dimention-1;j>i;j--){
      tranform1[j] = tranform1[j]-((tranform1[i]/tranform[i][i])*tranform[j][i]);
      let y = tranform[j][i];
      for(let k=0;k<dimention;k++){
        let sum = tranform[j][k]-((tranform[i][k]/tranform[i][i])*y);
        tranform[j][k] = sum;
      }
    }
  }
    let X = new Array(dimention);
        X[dimention - 1] = Math.round(tranform1[dimention - 1] / tranform[dimention - 1][dimention - 1]); //find Xn
        for (let i = dimention - 2; i >= 0; i--) { //find Xn-1 to X1
            var sum = tranform1[i];
            for (let j = i + 1; j < dimention; j++) {
                sum = sum - tranform[i][j] * X[j];
            }
            X[i] = Math.round(sum / tranform[i][i]);
        }
        for (let i = 0; i < dimention; i++) {
            ans.push({x:"x"+i,value:X[i],number: i,key : i })
        }
    setSans(true);
  }
  function init(){
      for (var i = 0; i < dimention; i++) {
        matrixA[i] = []
          for (var j = 0; j < dimention; j++) {
            matrixA[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
          }
          matrixB.push(parseFloat(document.getElementById("b" + (i + 1)).value));
      }
  }
  return (
    <div >
      {sinput && <div>
        <Input name="dimention" onChange={(e) => setDimention(e.target.value)}/>
        <Button onClick = {() => creatematrix()}>
          Create Matrix
        </Button>
        </div>}
        {smatrix && <div>
          <h>MatrixA</h><br/>{A}
          <h>MatrixB</h><br/>{B}
          <button onClick = {() => cal()}>
          click me!! 
          </button>
          </div>}
        {sans && <div>
          <Table columns={columns} dataSource={ans}/>
          </div>}
    </div>
  );
}
export default Gausseli;
