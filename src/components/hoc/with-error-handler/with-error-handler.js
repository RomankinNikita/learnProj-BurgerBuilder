import React, {Component, Fragment} from 'react';

import Modal from '../../modal/modal';

const withErrorHandler = (Wrapped, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentDidMount() {
      this.reqInt = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInt = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            close={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Wrapped {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
