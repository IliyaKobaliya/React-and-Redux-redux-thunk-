import {SIGN_IN} from "../actions/SignIn"

const initialState = {
    authBool: false,
    email: ``,
    token: ``,
};

export const authorization = (state = initialState, {type, payload}) => {
    if (type === SIGN_IN) {
        return {
            authBool: true,
            email: payload.email,
            token: payload.token,
        }
    }
    else {
        return state;
    }
};