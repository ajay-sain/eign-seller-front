

const initialState : any = {
    navigationVisibility: false,
}

export const navReducer = (state = initialState,action)=>{
    switch(action.type){
        case "TOGGLE_NAVIGATION_VISIBILITY":
            return {
                ...state,
                navigationVisibility : !state.navigationVisibility
            }
        case "ACTIVATE_ROUTE":
            console.log(action)
            return {
                ...state,
                activeRoute : action && action.payload
            }
    }
    return state;
}