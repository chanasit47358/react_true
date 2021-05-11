import React, { useState } from 'react';
import Inputfalse from "./Inputseacant.js"
import { Table, Tag, Space } from 'antd';
import Drawf from "./Draw.js";
const math = require('mathjs');
let id = 0;
let z = 0;
function Seacant() {
  const columns = [
    {
      title: 'Iteration',
      dataIndex: 'number',
      key: 'number',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Xk',
      dataIndex: 'xk',
      key: 'xk',
    },
    {
      title: 'Xk1',
      dataIndex: 'xk1',
      key: 'xk1',
    },
    {
      title: 'Error',
      dataIndex: 'error',
      key: 'error',
    }
  ]
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(
    {
      x: "",
      x1:"",
      fx: ""
    }
  )
  function addvalue(a,b,c) {
    setValue({ x: a,x1:b, fx: c });
  }
  function addpost(x, xold, error) {
    posts.push({xk: x, xk1: xold, error: error, number: id,key : id })
    id += 1;
  }
  return (
    <div>
      <Inputfalse
        addvalue={addvalue}
        addpost={addpost}
      />
      <Drawf fx = {value.fx}/>
     {posts.length != 0 && <Table columns={columns} dataSource={posts}/>}
    </div>
  );
}
export default Seacant;
