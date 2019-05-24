import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { get_Playlists_Id_Api, hadndle_Init_State, get_Video_Name } from '../../redux/playlist.redux'
import { Button, Loader } from 'semantic-ui-react'
import Content from './Content'
import { getKKoxAccessToken, doCookieSetup } from '../../utils/getKKBoxAPI'
import './playlist.scss'

class Playlist extends Component {

  get_Data(){
    let playlist_id = this.props.location.pathname.replace('/playlist/', '')
    let url = 'https://api.kkbox.com/v1.1/featured-playlists/' + playlist_id + '?territory=' + this.props.data.setting.language
    this.props.get_Playlists_Id_Api(url)
  }

  componentDidMount() {
    this.props.hadndle_Init_State()
    this.get_Data()
    
  }

  handle_Refresh(){
    this.props.hadndle_Init_State()
    getKKoxAccessToken()
    .then(res=>{
      if(res.access_token!==undefined){
        doCookieSetup('token',res.access_token,res.expires_in)
        this.get_Data()
      }
    }).catch(()=>{
      this.get_Data()
    })


  }


  render() {
    let res = this.props.data.playlist.playlist_data
    const bool = this.props.data.playlist.bool;
    return (
      <div className='container_header'>
        <div className='back' onClick={this.props.history.goBack}>
          <span herf='#' >{'< 返回'}</span>
        </div>
        <div className='refresh_button' style={this.props.data.playlist.msg==='伺服器錯誤'&&!bool?{display:'block'} :null} >
        <Button  onClick={()=>this.handle_Refresh()} primary size='big' >重新整理</Button>
        </div>
        <Loader active={bool} inline='centered' size='huge' ></Loader>
        {Object.keys(res).length ? <Content data={res}></Content> : null}
      </div>
    )
  }
}

const mapStateToProps = state => { return { data: state } }

const actionCreate = { get_Playlists_Id_Api, hadndle_Init_State, get_Video_Name }
Playlist = connect(mapStateToProps, actionCreate)(Playlist)

export default withRouter(Playlist)
