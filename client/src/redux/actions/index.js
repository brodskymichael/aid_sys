import axios from "axios";


export  function postUsers(payload){
    console.log(payload)
    return async function(dispatch){
        const json = await axios.post('https://spec-server.vercel.app/register', payload);
        console.log(json);
        return json;
    }
}
export function getUserA(payload){
    //console.log(payload)
   
    return async function(dispatch){
        var json = await axios.get('http://localhost:9000/userA', {params:payload});
        //console.log(json);
        return json.data[0]
        
    }
}


export function getUsers(){
    return async function(dispatch){
        var json = await axios ('https://spec-server.vercel.app/users',{}); 
        return dispatch({
            type: 'GET_USERS',
            payload: json.data
        })
    }
}
export function loginUser(payload){
    //console.log(payload)
    return async function(dispatch){
        const json = await axios.post('http://localhost:9000/auth', payload); 
        console.log(json)
        axios.defaults.headers.common['Authorization'] = `Bearer ${json.data['token']}`
        return dispatch({
            type: 'LOGIN',
            payload: json
        }) 
        
        
    }
}

export function logoutUser(){
    return async function(dispatch){
        const json =await axios.post('http://localhost:9000/logout');
        localStorage.removeItem('_auth')

        axios.defaults.headers.common['Authorization'] = `Bearer ${json.data['token']}`
        return dispatch({
            type: 'LOGOUT',
            payload: json
        })
    }
}
export function updateStates(payload){
    return async function(dispatch){
        const json = await axios.post('http://localhost:9000/updateStates', payload);
        return dispatch({
            type:'UPDATE_STATES',
            payload:json
        })
    }
}
export function updateStatesBreak(payload){
    return async function(dispatch){
        const json = await axios.post('http://localhost:9000/updateStatesBreak', payload);
        return dispatch({
            type:'UPDATE_STATES_BREAK',
            payload:json
        })
    }
}



