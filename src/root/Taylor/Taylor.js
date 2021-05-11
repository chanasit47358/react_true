import React, { useState } from 'react';
import Inputonepoint from "./Inputtaylor.js"
import { Table, Tag, Space } from 'antd';
import Draw from "./Draw.js";
let id = 0;
function Taylor() {
  const columns = [
    {
      title: 'Iteration',
      dataIndex: 'number',
      key: 'number',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Sum',
      dataIndex: 'sum',
      key: 'sum',
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
      x0 : "",
      fx: " "
    }
  )
  function addvalue(a,b,c) {
    setValue({ x: a, x0:b, fx: c });
    // addpost(a,0)
  }
  function addpost(sum,error) {
    posts.push({sum: sum,error: error, number: id,key : id })
    id += 1;
  }
  function ch(){
    console.log("1")
    console.log(<Table columns={columns} dataSource={posts}/>)
  }
  return (
    <div id="graph">
      <Inputonepoint
        addvalue={addvalue}
        addpost={addpost}
      />
      <Draw fx = {value.fx}/>
     {posts.length != 0 && <Table columns={columns} dataSource={posts}/>}
     <input type = "submit" onSubmit={ch} />
    </div>
  );
}
export default Taylor;
