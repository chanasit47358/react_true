import React, { useState } from 'react';
import Inputonepoint from "./Inputonepoint.js"
import { Table, Tag, Space } from 'antd';
import Draw from "./Draw.js";
const math = require('mathjs');
let id = 0;
function Onepoint() {
  const columns = [
    {
      title: 'Iteration',
      dataIndex: 'number',
      key: 'number',
      render: text => <a>{text}</a>,
    },
    {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
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
      fx: " "
    }
  )
  function addvalue(a,c) {
    setValue({ x: a, fx: c });
    addpost(a,0)
  }
  function addpost(x,error) {
    posts.push({x: x,error: error, number: id,key : id })
    id += 1;
  }
  return (
    <div id="graph">
      <Inputonepoint
        addvalue={addvalue}
        addpost={addpost}
      />
      <Draw fx = {value.fx}/>
     {posts.length != 0 && <Table columns={columns} dataSource={posts}/>}
    </div>
  );
}
export default Onepoint;
