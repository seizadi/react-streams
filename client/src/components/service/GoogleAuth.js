import React from "react";
import { connect } from "react-redux";

import GetClientId from "./GoogleClient";
import { signIn, signOut } from "../../actions";

// See gapi documentation
// https://developers.google.com/identity/sign-in/web/reference
// https://developers.google.com/identity/sign-in/web/reference#authentication
//
class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2',() => {
      window.gapi.client.init({
        clientId: GetClientId().Id,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange();
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    (this.auth.isSignedIn.get()) ? this.props.setSignIn() : this.props.setSignOut();
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
          className={'ui red google button'}
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
    signedIn: state.signedIn
  });
}

export default connect(mapStateToProps,
  { setSignIn: signIn, setSignOut: signOut })(GoogleAuth);
