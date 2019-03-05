import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_Category_Box_api, handle_Init_State } from '../../redux/category_box.redux'
import { withRouter, } from 'react-router-dom'

import Box from '../box/box'

class Category_box extends Component {

    componentWillMount() {
        this.props.handle_Init_State()
        let url = this.props.location.url 
        ? this.props.location.url 
        : 'https://api.kkbox.com/v1.1/featured-playlist-categories/' + this.props.location.pathname.split('/')[2] + '?territory=' + localStorage.getItem('language')
        this.props.get_Category_Box_api(url)
    }
    render() {
        return (
            <div>
                <Box
                    data={this.props.data.category_box.category_box_data.hasOwnProperty('playlists') ? this.props.data.category_box.category_box_data.playlists.data : null}
                    title={this.props.data.category_box.category_box_data.hasOwnProperty('title') ? this.props.data.category_box.category_box_data.title : null}
                    bool={this.props.data.category_box.bool}
                >
                </Box>
            </div>
        )
    }
}
const mapStatetoProps = state => { return { data: state } }
const actionCreate = { get_Category_Box_api, handle_Init_State }

export default withRouter(connect(mapStatetoProps, actionCreate)(Category_box))
