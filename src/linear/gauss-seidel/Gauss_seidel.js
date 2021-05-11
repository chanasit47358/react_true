import React, { useState } from 'react';
import { Table,Button, Calendar, Input, Select } from 'antd';
import { det, log } from 'mathjs';
const math = require('mathjs');
let A = [],B = [],X=[],matrixA=[],matrixB=[],matrixX=[],round=0;;
function Gauss_seidel() {
  const [dimention,setDimention] = useState('');
  const [number,setNumber] = useState([]);
  const [sinput,setSinput] = useState(true);
  const [sans,setSans] = useState(false);
  const [smatrix,setSmatrix] = useState(false);
  const [ans,setAns] = useState([]);
  const columns = [
    {
      title: 'Iteration',
      dataIndex: 'Iteration',
      key: 'Iteration',
      render: text => <a>{text}</a>,
    },
    {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Oldvalue',
      dataIndex: 'oldvalue',
      key: 'oldvalue',
    },
    {
      title: 'Error',
      dataIndex: 'error',
      key: 'error',
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
      X.push(
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
      id={"x" + i} key={"x" + i} placeholder={"x" + i} />
      )     
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
    let error;
    let loop = true;
    let sum;
    let tranform = JSON.parse(JSON.stringify(matrixA));
    let tranform1 = JSON.parse(JSON.stringify(matrixB));
    let tranform2 = JSON.parse(JSON.stringify(matrixX));
    let allans = tranform2;
    while(round < 4){
        for(let i=0;i<dimention;i++){ // row
          sum = tranform1[i];
          for(let j=0;j<dimention;j++){
            if(i != j){
              sum = sum-(tranform[i][j]*allans[j]);
            }
          }
          sum = sum/tranform[i][i];
          error = math.abs((sum-allans[i])/sum);
          error = error.toFixed(6)
          ans.push({x:"x"+i,value:sum,Iteration:round,oldvalue:allans[i],error:error})
          allans[i] = sum;
          sum = 0;
          if(error <= 0.0000001){
            loop = false;
          }
        }
        round++;
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
          matrixX.push(parseFloat(document.getElementById("x" + (i + 1)).value));
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
          <h>MatrixX</h><br/>{X}<br/>
          <h>MatrixB</h><br/>{B}
          <Button onClick = {() => cal()}>
          click me!! 
          </Button>
          </div>}
        {sans && <div>
          <Table columns={columns} dataSource={ans}/>
          </div>}
    </div>
  );
}
export default Gauss_seidel;
