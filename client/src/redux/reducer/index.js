import jwt_decode from "jwt-decode";



const initialState = {
    users: [],
    userToken: null,
    refreshToken: null,
    usersA:[],
    received_msg:[],
    send_msg:[]

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
        case 'POST_MESSAGE':
            return{
                ...state
            }
        case 'GET_RECEIVED_MSG':
            return{
                ...state,
                received_msg: action.payload
            }
        case 'GET_SEND_MSG':
        return{
            ...state,
            send_msg: action.payload
        }
        case 'POST_SEEN':
            return{
                ...state
            }
        case 'POST_QUESTION':
            return{
                ...state
            }
        case 'POST_MOOD':
            return{
                ...state
            }
        case 'DELETE_USER':
        return{
            ...state
        }
        case 'GET_HISTORY':
        return{
            ...state
        }
        case 'UPDATE_SETTINGS':
        return{
            ...state
        }
        case 'UPDATE_BREAK_FALSE':
        return{
            ...state
        }
        default:
            return state;
    }
} 
export default rootReducer;