import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import '../styles/styles.css'
import {AppWrapper} from '../components/UserInfo'

export default function MyApp({ Component, pageProps }) {
  
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
