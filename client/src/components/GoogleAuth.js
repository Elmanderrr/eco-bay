import React from 'react'
import {connect} from 'react-redux';
import { signIn, signOut } from "../actions"

class GoogleAuth extends React.Component {

  auth = null;
  
  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '778843196802-549c2du33u8jj50ol88vi9390lqsi8jn.apps.googleusercontent.com',
        scope: 'email'
      }).then(resp => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange.bind(this));
      })
    })
  }
  
  onAuthChange(signStatus) {
    if ( signStatus ) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }

  }

  signInStatus() {
    if ( this.props.isSignedIn === null ) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.signOut.bind(this)}>
          <i className="google icon"/>
          Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui blue google button" onClick={this.signIn.bind(this)}>
          <i className="google icon"/>
          Sign In with Google
        </button>
      )
    }
  }

  render () {
    return (
      <div>
        {this.signInStatus()}
      </div>
    );
  }

  signOut() {
    this.auth.signOut()
  }

  signIn () {
    this.auth.signIn()
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps, { signOut, signIn })(GoogleAuth)
