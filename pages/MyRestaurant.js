import {Button, Tabs} from 'antd'
import {LeftOutlined, RightOutlined, StarOutlined, EnvironmentOutlined, FilterOutlined} from '@ant-design/icons'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import {useAppContext} from '../components/UserInfo'
import Tables from './tables'
import Categories from './categories'
import Orders from './orders'

const MyRestaurant = () => {
  const axios = require('axios');
  const [loaded, setLoaded] = useState(false);
  const {user, setUser, id, token, disheT, setD, roomsT, setR} = useAppContext();

  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }

  useEffect(()=>{
    axios.post('http://localhost:3000/api/menu',
    {
      "restaurantId": id
    })
    .then(function (response) {
        setD(response.data.restaurant.menu.length);
        setR(response.data.restaurant.room.length);
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
  },[disheT, roomsT]);

  return (
    <>
        <div className="header">
            <img src="/oliva_logo.png"></img>
          <p>{user}</p>
        </div>
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Orders" key="1">
                <Orders/>
            </TabPane>
            <TabPane tab={"Tables(" + roomsT + ")"} key="2">
                <Tables/>
            </TabPane>
            <TabPane tab={"Dishes(" + disheT + ")"} key="3">
                <Categories/>
            </TabPane>
        </Tabs>
        
        <Navbar/>
    </>
  )
}

export default MyRestaurant;