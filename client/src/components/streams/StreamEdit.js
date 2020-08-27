import React from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

import { getStream } from "../../actions";
import Loading from "../Loading";
import StreamForm from "./StreamForm";
import { updateStream } from "../../actions";

class StreamEdit extends React.Component {

  componentDidMount() {
    this.props.getStream( this.props.match.params.id );
  }

  onSubmit = (formValues) =>{
    this.props.updateStream(this.props.match.params.id, formValues);
  }

  render() {
    if ( !this.props.stream ) {
      return (
        <div className="ui container">
          <Loading show={true} message={'Loading'} />
        </div>
      );
    }
    // const { title, description } = this.props.stream;
    // const initialValues = {title, description};
    const initialValues = _.pick(this.props.stream, 'title', 'description');
    return (
        <StreamForm onSubmit={this.onSubmit} initialValues={ initialValues }/>
    );
  }
}

const mapStateToProps = ( state, ownProps ) => {

  return { stream: state.streams[ ownProps.match.params.id ]};

}
export default connect(mapStateToProps, { getStream, updateStream } )(StreamEdit);
