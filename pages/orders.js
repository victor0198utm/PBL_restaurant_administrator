import {Button, Input, Tabs} from 'antd'
import {LeftOutlined, RightOutlined, StarOutlined, EnvironmentOutlined, FilterOutlined} from '@ant-design/icons'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import {useAppContext} from '../components/UserInfo'

const Orders = () => {
  const axios = require('axios');
  const [loaded, setLoaded] = useState(false);
  const {user, setUser, id, token, disheT, setD, roomsT, setR, dishes, setDishes} = useAppContext();
  const [order,  setOrder] = useState([]);
  const [ao, setao] = useState([]);
  const [orderState, setOrderState] = useState(0);

  useEffect(()=>{
    axios.post('http://localhost:3000/api/waiter/get',
    {
      "restaurantId": id
    },
    {
        headers: {"auth-token": `${token}`}
    })
    .then(function (response) {
        setOrder(response.data);
    })
    .catch(function (error) {
        console.log(error); 
    })
    .then(function () {
    });

        axios.post('http://localhost:3000/api/menu',
        {
          "restaurantId": id
        })
        .then(function (response) {
            setDishes(response.data.restaurant.menu);
            setUser(response.data.restaurant.title);
        })
        .catch(function (error) {
            console.log(error); 
        })
        .then(function () {
        });
    
  },[]);

  useEffect(()=>{    
    let tao = [];
    if(order[0]){       
        for (let i = 0; i < order[0].items.length; i++) {
            for (let j = 0; j < dishes.length; j++) {
                if(order[0].items[i] == dishes[j]._id){
                    tao.push(dishes[j]);
                }
            } 
        } 
    }

    setao(tao);
  },[order, dishes]);

  useEffect(()=>{
    setLoaded(true);
  },[disheT, roomsT]);

  return (
    <>
        <div className="restaurants">
            {ao.length>0 &&
            <div className="one_order">
                {ao.map(obj => (
                    <div className="dish" key={obj._id}>
                        <Input type="checkbox" disabled={orderState==0 && "true"}></Input>
                        <p>{obj.description} - {obj.title}</p>
                    </div>
                ))}
                <div className="buttons">
                    <Button onClick={e=>{
                        if (orderState==0) {setOrderState(1);}
                        else {setOrderState(2);}
                    }} className={(orderState==0)?"activate":""}>
                        {orderState==0 && 
                        <span>Activate order</span>}
                        {orderState==1 && 
                        <span>Done</span>}
                    </Button>
                </div>
            </div>
            }
        </div>

        
    </>
  )
}

export default Orders;