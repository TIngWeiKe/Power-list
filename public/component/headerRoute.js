import React, { Component } from 'react'
import { Link,  withRouter, Redirect } from 'react-router-dom'
import Language_form from '../container/setting/language_form'
import { Menu} from 'semantic-ui-react'

class HeaderRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: '/today'
    }
  }
  componentWillMount(){
    //default route
    // this.props.history.push('/today')
    //default language
    localStorage.getItem('language')==null? localStorage.setItem('language','TW'):null
    
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div>

        <Menu color="blue" className='menu' style={{ position: 'fixed', top: '0px', width: '100%', zIndex: '99', Bottom: '200px' }} size='large' borderless={true} >
          <Menu.Item
            as={Link}
            name='/today'
            active={activeItem === '/today'}
            onClick={this.handleItemClick}
            to={{ pathname: '/today', search: this.props.location.search }}
          >
            今日精選
        </Menu.Item>

          <Menu.Item
            as={Link}
            name='/playlist_category'
            active={activeItem === '/playlist_category'}
            onClick={this.handleItemClick}
            to={{ pathname: '/playlist_category', search: this.props.location.search }}
          >
            歌單
        </Menu.Item>

          <Menu.Item
            as={Link}
            name='/recents'
            active={activeItem === '/recents'}
            onClick={this.handleItemClick}
            key={''}
            to={{ pathname: '/recents', search: this.props.location.search }}
          >
            最近播放
        </Menu.Item>
         
          
          {/* <Menu.Item
            as={Link}
            color={"blue"}
            name='setting'
            active={activeItem === 'setting'}
            onClick={this.handleItemClick}
            to={{ pathname: '/setting/', search: this.props.location.search }}
          >
            設定
        </Menu.Item> */}
        <Language_form></Language_form>
        </Menu>
        
      </div>

    )
  }
}

export default withRouter(HeaderRoute)
