
const initialState : any = {
    user : false
}

export const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case "LOGIN_USER":
            return {
                ...state,
                user : action.payload
            }
        case "LOGOUT_USER":
            return {
                ...state,
                user : false
            }
        case "UPDATE_USER_DETAILS" :
            return {
                ...state,
                user : action.payload
            }
    }
    return state;
}