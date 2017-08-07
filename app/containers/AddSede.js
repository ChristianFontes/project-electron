import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';
import AddSede from '../components/AddSede';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { // eslint-disable-line no-unused-vars
  const user = bindActionCreators(userActions, dispatch);
  return {
    onLogin: user.login
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSede);
