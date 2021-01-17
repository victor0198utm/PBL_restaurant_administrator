import {Button, Image} from 'antd'
import {LeftOutlined, RightOutlined, StarOutlined, EnvironmentOutlined, FilterOutlined} from '@ant-design/icons'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import {useAppContext} from '../components/UserInfo'

const MyRestaurant = () => {
  const axios = require('axios');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNkNzBmNjk5NWMxZjM3OThjNmViNjIiLCJpYXQiOjE2MDc0NDA2MTJ9.ycPmdRVStLV0uI0TJqkVv9Fgy4eeWtkKjqVHV9g17Lc";
  const [menu, setMenu] = useState([]);
  const [room, setRoom] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const {user, setUser, id} = useAppContext();

  useEffect(()=>{
    axios.post('http://localhost:3000/api/menu',
    {
      "restaurantId": id
    })
    .then(function (response) {
        setMenu(response.data.restaurant.menu.length);
        setRoom(response.data.restaurant.room.length);
        setUser(response.data.restaurant.title);
    })
    .catch(function (error) {
        console.log(error); 
    })
    .then(function () {
    });
  },[]);

  useEffect(()=>{
    setLoaded(true);
  },[menu, room]);

  return (
    <>
        <div className="header">
            <img src="/oliva_logo.png"></img>
          <p>{user}</p>
        </div>
        <div className="restaurants">
            <Link href={"/categories"}>
                <Button className="item" style={{marginTop:10, height:75}}>
                    <div className="item_content">
                        <div className="img_div">
                            <img src="/logopart.png" width={50} height={50}/>
                        </div>
                        <div className="item_description">
                            <p className="name">DISHES</p>
                            <p className="address">{menu} items</p>
                        </div>
                    </div>
                    <span>
                        <RightOutlined/>
                    </span>
                </Button>
            </Link>
            <Link href={"/tables"}>
                <Button className="item" style={{height:75}}>
                    <div className="item_content">
                        <div className="img_div">
                            <img src="/tablef.jpg" width={50} height={50}/>
                        </div>
                        <div className="item_description">
                            <p className="name">TABLES</p>
                            <p className="address">{room} items</p>
                        </div>
                    </div>
                    <span>
                        <RightOutlined/>
                    </span>
                </Button>
            </Link>
        </div>
        
        <Navbar/>
    </>
  )
}

export default MyRestaurant;