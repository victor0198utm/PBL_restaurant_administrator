import {Button} from 'antd'
import {UserOutlined, ScanOutlined, ShopOutlined} from '@ant-design/icons'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="icon_div">
            <UserOutlined className="icon"/>
        </div>
        <div className="icon_div">
          <Link href="/scan">
            <ScanOutlined className="icon"/>
          </Link>
        </div>
        <div className="icon_div">
          <Link href="/restaurants">
            <ShopOutlined className="icon"/>
          </Link>
        </div>
    </div>
  )
}

export default Navbar;