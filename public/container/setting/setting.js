import React, { Component } from 'react'
import { Redirect , withRouter } from 'react-router-dom'


class setting extends Component {

  
  render() {
    console.log(this.props.history);
    
    return (
      <div className="header">
        <h1>設定</h1>
        {this.props.history.goBack()}
      </div>

    )
  }
}


export default withRouter(setting)