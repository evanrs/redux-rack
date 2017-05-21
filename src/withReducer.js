import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoiseStatics from 'hoist-non-react-statics';

export function withReducer(path, reducer) {
  // return (C) => C;
  return WrappedComponent => {
    class RackedReducer extends Component {
      static contextTypes = {
        store: PropTypes.object,
      };

      componentWillMount() {
        this.context.store.stageReducer(path, reducer);
      }

      componentDidMount() {
        this.context.store.mountReducer(path, reducer);
      }

      componentWillUnmount() {
        this.context.store.unmountReducer(path, reducer);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoiseStatics(RackedReducer, WrappedComponent);
  };
}

export default withReducer;
