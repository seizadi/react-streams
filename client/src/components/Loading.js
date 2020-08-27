import React from 'react';

const Loading = ( props ) => {
  if ( props.show ) {
    return (
      <div className="ui segment" style={{ height: 150}}>
        <div className={'ui active inverted dimmer'}>
          <div className={ 'ui big text loader'} >
            { props.message }
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Loading;
