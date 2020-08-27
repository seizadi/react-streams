import React from "react";
import { connect } from "react-redux";

import GetClientId from "./GoogleClient";
import { signIn, signOut } from "../../actions";

// See gapi documentation
// https://developers.google.com/identity/sign-in/web/reference
// https://developers.google.com/identity/sign-in/web/reference#authentication
//
// To talk to a server best to present the JWT Token you get using:
// gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
// You can cut and paste the token to site like https://jwt.io/ to see claims
//
class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2',() => {
      window.gapi.client.init({
        clientId: GetClientId().Id,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const user = this.auth.currentUser.get();
      const userId = user.getId();
      const jwt = user.getAuthResponse().id_token;
      const email = user.getBasicProfile().getEmail();
      const name = user.getBasicProfile().getName();
      this.props.signIn(userId, name, email, jwt);
    } else {
      this.props.signOut();
    }
  };

  signInOnClick = () => {
    this.auth.signIn();
  }

  signOutOnClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if(this.props.signedIn === null) {
     return null;
    } else if (this.props.signedIn) {
      return (
        <button
          className={'ui yellow google button'}
          onClick={this.signOutOnClick}
        >
          <i className={'google icon'} />
          Log Out
        </button>
      );
    } else {
      return (
        <button
          className={'ui green google button'}
          onClick={this.signInOnClick}
        >
          <i className={'google icon'} />
          Log In
        </button>
      );
    }
  }

  render() {
    return(
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    signedIn: state.auth.signedIn
  });
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
