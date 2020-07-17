import React from 'react';
import { connect } from 'react-redux';

import GoogleAuth from "../GoogleAuth"

class Header extends React.Component {
  render () {
    return (
      <div className="ui secondary pointing menu">
        <div className="right menu">

        </div>
        <GoogleAuth/>
      </div>
    )
  }
}

export default Header

