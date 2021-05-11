import React, { useState } from 'react';
import Inputbisection from "./Inputbisection.js"
import { Table, Tag, Space } from 'antd';
import Graphs from "../../component/Graph.js";
import Draw from "./Draw.js";
const math = require('mathjs');
let id = 0;
let z = 0;
function Bisection() {
  const columns = [
    {
      title: 'Iteration',
      dataIndex: 'number',
      key: 'number',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Xl',
      dataIndex: 'xl',
      key: 'xl',
    },
    {
      title: 'Xr',
      dataIndex: 'xr',
      key: 'xr',
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
      xl: "",
      xr: "",
      fx: " "
    }
  )
  function addvalue(a, b, c) {
    setValue({ xl: a, xr: b, fx: c });
    addpost(a, b, 0)
  }
  function addpost(xl, xr, error) {
    posts.push({xl: xl, xr: xr, error: error, number: id,key : id })
    id += 1;
  }
  return (
    <div id="graph">
      <Inputbisection
        addvalue={addvalue}
        addpost={addpost}
      />
      <Draw fx = {value.fx}/>
     {posts.length != 0 && <Table columns={columns} dataSource={posts}/>}
    </div>
  );
}
export default Bisection;
