export const SIGN_IN = "SIGN_IN";

export const SignIn = (email,token,firstName,lastName) =>({
    type: SIGN_IN,
    payload: {email,token,firstName,lastName}
});