import { combineReducers } from 'redux';

function hello(state = 'Hello World!') {
  return state;
}

export default combineReducers({
  hello,
});
