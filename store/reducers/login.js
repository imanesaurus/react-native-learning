import {USERS} from '../../src/data/user-data';

const initialState = {
    availableUsers : USERS,
    isLogin: false
}

export default (state = initialState, action) => {
    return state;
}
