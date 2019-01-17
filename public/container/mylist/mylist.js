import React, { Component } from 'react'
import {play_Icon} from '../../component/playlist/playlist.img'
import { Button, Grid, Image, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getMylist } from '../../redux/mylist_redux'
import {searchYoutubeByUrl} from '../../redux/youtube.redux'
import { getUrlVars} from '../../component/getKKboxAPI'
const url = 'https://account.kkbox.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fmylist&client_id=b89dc89b34b7f4d2759580c9b53141ae&response_type=code&state=1111'
class Mylist extends Component {
    constructor(props){
        super(props)
        this.state={
            toggle:true,

        }
    }
    componentDidMount() {
        console.log(getUrlVars());
        if(getUrlVars()){
            this.props.getMylist()
        }
        
        
    }
    handle_play_button(name, artist) {
        this.setState({ name: name })
        this.props.searchYoutubeByUrl( { name: name + '  ' + artist })
    }
    handle_Sort(){
        this.setState({toggle:!this.state.toggle})
        this.props.data.mylist.data.reverse()
    }
    
    render() {
        let data = this.props.data.my_info?  this.props.data.my_info : null
        return (
            <div className="header">
                <h1>匯入</h1>
                <Button disabled={!!this.props.data.my_info} >  <a href={url}>登入 ＫＫＢＯＸ</a>  </Button>
                
                <Grid stackable={true} textAlign={"left"}>
                    <Grid.Column widescreen={7}>
                        {/* <h1>{data.title}</h1> */}
                        <Grid>
                            <Grid.Column width={16}>
                                <Image src={data?this.props.data.my_info.images[2].url:null} />
                                <div className='playlist_text_box'>
                                    <div className='list_description'>
                                    </div>
                                    <div className="list_text">
                                        <a className="list_owner" href={data?this.props.data.my_info.url:null}><h2>{data?this.props.data.my_info.name:null}</h2></a>
                                    </div>

                                </div>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>

                    <Loader content='載入中...' style={{bottom:'200px !important'}} active={this.props.data.mylist.data==undefined}  size='massive' /> 
                    <Grid.Column widescreen={9}>
                    {this.props.data.mylist.data!=undefined? <Button onClick={()=>this.handle_Sort()}>排序</Button>:null}
                    {this.props.data.mylist.data!=undefined? <h3>{this.state.toggle?'最舊 ======> 最新' :'最新 ======> 最舊'}</h3>:null}
                        {this.props.data.mylist.data!=undefined? this.props.data.mylist.data.map(data => {
                            return <div key={data.id} className="track">
                                <Grid.Row>
                                    <Button className='play_button' fluid onClick={()=>this.handle_play_button(data.name,data.album.artist.name)}>
                                        <Grid.Column width={3}>
                                        {this.state.name == data.name ? <Image className='play_Icon' src={play_Icon}></Image> : null}
                                            <Image className='playlist_img' src={data.album.images[0].url}></Image>
                                        </Grid.Column>
                                        <Grid.Column width={6}>
                                            <div className='playlist_info'>
                                                <h4>{data.name}</h4>
                                                <p>{data.album.artist.name}</p>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {/* <Image src={sidebar} className='siderbar' ></Image> */}
                                        </Grid.Column>
                                    </Button>
                                </Grid.Row>
                            </div>
                        }) : null}
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}

const mapStatetoProps = state => {
    return { data: state.mylist  }
}
const actionCreate = {getMylist,searchYoutubeByUrl}
Mylist = connect(mapStatetoProps, actionCreate)(Mylist)

export default Mylist