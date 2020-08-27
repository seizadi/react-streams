import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from "../modal";
import history from "../../history";
import { getStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  actions = (
    <React.Fragment>
      <button
        onClick={() => {this.props.deleteStream(this.props.match.params.id)}}
        className="ui button negative"
      >Delete</button>
      <Link to={'/'} className="ui  button">Cancel</Link>
    </React.Fragment>
  );

  componentDidMount() {
    this.props.getStream( this.props.match.params.id );
  }

  renderContent() {
    if ( !this.props.stream ) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete stream with title: ${this.props.stream.title}?`;
  }

  render() {
    return (
      <Modal
        title={'Delete Stream'}
        content={this.renderContent()}
        actions={this.actions}
        onDismiss={() => history.push('/')}
      />
    );
  }
}


const mapStateToProps = ( state, ownProps ) => {
  return { stream: state.streams[ ownProps.match.params.id ]};
}

export default connect(mapStateToProps, { getStream, deleteStream } )(StreamDelete);
