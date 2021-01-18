import {Button, Input, Form, Popconfirm } from 'antd'
import {LeftOutlined, CloseOutlined} from '@ant-design/icons'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { route } from 'next/dist/next-server/server/router'
import { useEffect, useState } from 'react'
import {useAppContext, setUser} from '../components/UserInfo'



const Categories = () => {
  const axios = require('axios');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA0YzY3YWJjNDZkOTRiYzBiZmUzNTkiLCJpYXQiOjE2MTA5MjYxMDd9.pUrhHHV7LrT_2W-T_aUKL21Uv3nnjEt5Tnhs6Q22g2s";
  const [categoriesMap, setCategoriesMap] = useState(new Map());
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("Loading..");
  const {user, setUser, id, dishes, setDishes} = useAppContext();
  const [form] = Form.useForm();


  const loadDishes = () => {
    axios.post('http://localhost:3000/api/menu',
    {
      "restaurantId":id
    })
    .then(function (response) {
      setDishes(response.data.restaurant.menu);
      setUser(response.data.restaurant.title);
      if(response.data.restaurant.menu.length == 0){
        setMessage("No dishes");
      }
    })
    .catch(function (error) {
      console.log(error); 
    })
    .then(function () {
    });
  }

  useEffect(()=>{
    loadDishes();
  },[]);

  const addDish = () =>{
    axios.post('http://localhost:3000/api/menuElement/create',
    {
      "title": form.getFieldValue("name"),
      "description": form.getFieldValue("category"),
      "image": form.getFieldValue("image"),
      "price": form.getFieldValue("price"),
      "restaurantId": id
    },
    {
      headers: {"auth-token": `${token}`}
    })
    .then(function (response) {
      // handle success
      loadDishes();
    })
    .catch(function (error) {
      // handle error
      console.log(error); 
    })
    .then(function () {
    });
  }

  const confirmDelete=(dishId)=>{
    axios.post('http://localhost:3000/api/menuElement/remove',
    {
      "restaurantId": id,
      "menuElementId": dishId
    },
    {
      headers: {"auth-token": `${token}`}
    })
    .then(function (response) {
      // handle success
      loadDishes();
    })
    .catch(function (error) {
      // handle error
      console.log(error); 
    })
    .then(function () {
    });
  }

  return (
    <>
      <div className="menu">
        <div className="c_list">
          {dishes.length == 0 && <p>{message}</p>}
          {dishes.length > 0 &&
            dishes.map(x=> {
            return (
                  <Button key={x._id} className="m_c">
                      <div className="overlay">
                          <img src={x.image}></img>
                        <Popconfirm onConfirm={e=>{confirmDelete(x._id);}} className="del_dish" title={"Delete " + x.title + "？"} okText="Yes" cancelText="No">
                          <CloseOutlined/>
                        </Popconfirm>
                      </div>
                      <div className="info">
                        <p className="name">{x.title}</p>
                        <p className="nr_items">{x.price} MDL</p>
                      </div>
                  </Button>);
            })
          }
          <div className="add_category">
            <Form form={form} name="control-hooks" onFinish={addDish}>
              <h2>Add a dish</h2>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input type="text"></Input>
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Input type="text"></Input>
              </Form.Item>
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
               <Input type="number"></Input>
              </Form.Item>
              <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
               <Input type="url"></Input>
              </Form.Item>
              <Form.Item>
                <div className="with_btn">
                  <Button type="primary" htmlType="submit">ADD DISH</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Categories;