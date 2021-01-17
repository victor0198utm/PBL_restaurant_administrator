import {Button, Image, Popconfirm, Tooltip} from 'antd'
import {LeftOutlined, ClockCircleOutlined, CheckCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import {useAppContext} from '../components/UserInfo'

const Tables = () => {
  const axios = require('axios');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkNzBmNjk5NWMxZjM3OThjNmViNjIiLCJpYXQiOjE2MDc0NDA2MTJ9.ycPmdRVStLV0uI0TJqkVv9Fgy4eeWtkKjqVHV9g17Lc";
  const [room, setRoom] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const {user, setUser, id} = useAppContext();

  const loadTables = () =>{
    axios.post('http://localhost:3000/api/menu',
    {
      "restaurantId": id
    })
    .then(function (response) {
        setRoom(response.data.restaurant.room);
        console.log(response.data.restaurant.room);
        setUser(response.data.restaurant.title);
    })
    .catch(function (error) {
        console.log(error); 
    })
    .then(function () {
    });
  }

  useEffect(()=>{
    loadTables();
  },[]);

  useEffect(()=>{
    setLoaded(true);
  },[room]);

  const confirmCreate=()=>{
    axios.post('http://localhost:3000/api/tableRoom/create',
    {
        "title": "Table " + (room.length+1),
        "restaurantId": id
    },
    {
        headers: {"auth-token": `${token}`}
    })
    .then(function (response) {
        loadTables();
    })
    .catch(function (error) {
        console.log(error); 
    })
    .then(function () {
    });
  }

  const confirmDelete=()=>{
    console.log(room);
    console.log(room[room.length-1]._id);
    axios.post('http://localhost:3000/api/tableRoom/remove',
    {
        "restaurantId": id,
        "tableRoomId": room[room.length-1]._id
    },
    {
        headers: {"auth-token": `${token}`}
    })
    .then(function (response) {
        loadTables();
    })
    .catch(function (error) {
        console.log(error); 
    })
    .then(function () {
    });
  }

  return (
    <>
        <div className="header">
            <Link href={"/"}>
            <Button>
              <LeftOutlined />
            </Button>
          </Link>
          <p>{user}'s tables</p>
        </div>
        <div className="restaurants">
            {room.length > 0 &&
                room.map((x, idx)=> {
                return (
                <div key={x._id} className="item">
                    <div className="item_content">
                        <div className="img_div table_img">
                            <img src="/tablef.jpg" width={50} height={50}/>
                        </div>
                        <div className="item_description">
                            <p className="name">TABLE {idx+1}</p>
                            {x.users.length >= 0?<h5>{x.users.length} clients</h5>:<></>}
                        </div>
                    </div>
                    <span>
                        {x.booked?
                        <Tooltip title="busy" color={"#ecc700"}>
                            <ClockCircleOutlined style={{color:"#ecc700"}}/>
                        </Tooltip>
                        :
                        <Tooltip title="free" color={"green"}>
                            <CheckCircleOutlined style={{color:"green"}}/>
                        </Tooltip>
                        }
                    </span>
                </div>
                )})
            }
            <Popconfirm title="Are you sure？" onConfirm={e=>{confirmCreate();}}>
                <Button className="add_table">Add table</Button>
            </Popconfirm>
            <Popconfirm title="Are you sure？" onConfirm={e=>{confirmDelete();}} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                <Button className="del_table">Delete table</Button>
            </Popconfirm>
        </div>
        
        <Navbar/>
    </>
  )
}

export default Tables;