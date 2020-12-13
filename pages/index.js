import { Form, Select, InputNumber, Switch, Slider, Button } from 'antd'

// Custom DatePicker that uses Day.js instead of Moment.js
import DatePicker from '../components/DatePicker'

import { SmileFilled } from '@ant-design/icons'

import Link from 'next/link'
import MyRestaurant from './MyRestaurant'

export default function Home() {
  return (
    <div>
      <MyRestaurant/>
    </div>
  )
}
