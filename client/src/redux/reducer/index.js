import jwt_decode from "jwt-decode";



const initialState = {
    users: [],
    userToken: null,
    refreshToken: null,
    usersA:[]

}



function rootReducer(state = initialState, action){
   
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'POST_USER':
            console.log(action.payload)
            return{
                ...state
            }
        case 'LOGIN':
            //console.log(action.payload)
            //const token = localStorage.getItem('token')
            //const jwt_decoded = jwt_decode(token)

            return{
                ...state,
                userToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken

            }
        case 'GETUSERA':
            return{
                ...state,
                usersA: action.payload
            }
        case 'LOGOUT':
            return{
                ...state
            }
        case 'UPDATE_STATES':
            return{
                ...state,
            }
        case 'UPDATE_STATES_BREAK':
            return{
                ...state,
            }
        default:
            return state;
    }
} 
export default rootReducer;