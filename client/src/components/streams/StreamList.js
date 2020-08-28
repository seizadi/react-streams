import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { listStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.listStreams();
  }

  renderOwner(stream) {
    if (stream.userId === this.props.currentUserId ) {
      return (
        <div className="right floated content">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="ui button primary" >
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map( (stream) => {
      return (
        <div className="item" key={ stream.id } >
          { this.renderOwner(stream) }
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/show/${stream.id}`}
                  className={'header'}
            >
              { stream.title }
            </Link>
            <div className="description">
              { stream.description }
            </div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.signedIn) {
      return(
        <div style={{ textAlign: 'right'}}>
          <Link className={'ui button primary'} to={'/streams/new'} >
            Create Stream
          </Link>
        </div>
        );
    }
  }

  render() {
    return(
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          { this.renderList() }
        </div>
        { this.renderCreate() }
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    currentUserId: state.auth.userId,
    streams: Object.values(state.streams)
  };
};

export default connect(mapStateToProps, { listStreams })(StreamList);
