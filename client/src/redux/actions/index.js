import axios from "axios";


export function postUsers(payload) {
    console.log(payload)
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/register', payload);
        console.log(json);
        return json;
    }
}
export function getUserA(payload) {
    //console.log(payload)

    return async function (dispatch) {
        var json = await axios.get('http://localhost:9000/userA', { params: payload });
        //console.log(json);
        return json.data[0]

    }
}


export function getUsers() {
    return async function (dispatch) {
        var json = await axios('http://localhost:9000/users', {});
        return dispatch({
            type: 'GET_USERS',
            payload: json.data
        })
    }
}
export function loginUser(payload) {
    //console.log(payload)
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/auth', payload);
        console.log(json)
        axios.defaults.headers.common['Authorization'] = `Bearer ${json.data['token']}`
        return dispatch({
            type: 'LOGIN',
            payload: json
        })


    }
}

export function logoutUser(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/logout', payload);
        localStorage.removeItem('_auth')

        axios.defaults.headers.common['Authorization'] = `Bearer ${json.data['token']}`
        return dispatch({
            type: 'LOGOUT',
            payload: json
        })
    }
}
export function updateStates(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/updateStates', payload);
        return dispatch({
            type: 'UPDATE_STATES',
            payload: json
        })
    }
}
export function updateStatesBreak(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/updateStatesBreak', payload);
        return dispatch({
            type: 'UPDATE_STATES_BREAK',
            payload: json
        })
    }
}
export function updateBreakFalse(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/updateBreakFalse', payload);
        return dispatch({
            type: 'UPDATE_BREAK_FALSE',
            payload: json
        })
    }
}
export function postMessage(payload) {
    console.log(payload)
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/postmessage', payload);
        return dispatch({
            type: 'POST_MESSAGE',
            payload: json
        })
    }
}



export function getreceivedmsg(payload) {
    return async function (dispatch) {
        const json = await axios('http://localhost:9000/getreceivedmsg', { params: payload });
        return dispatch({
            type: 'GET_RECEIVED_MSG',
            payload: json
        })
    }
}
export function getsendmsg(payload) {
    return async function (dispatch) {
        const json = await axios('http://localhost:9000/getsendmsg', { params: payload });
        return dispatch({
            type: 'GET_SEND_MSG',
            payload: json
        })
    }
}

export function markSeen(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/markseen', payload)
        return dispatch({
            type: 'POST_SEEN',
            payload: json
        })
    }
}

export function sendQuestion(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/sendquestion', payload)
        return dispatch({
            type: 'POST_QUESTION',
            payload: json
        })
    }
}

export function changeMood(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/changemood', payload)
        return dispatch({
            type: 'POST_MOOD',
            payload: json
        })
    }
}

export function deleteUser(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/deleteUser', payload)
        return dispatch({
            type: 'DELETE_USER',
            payload: json
        })
    }
}

export function getHistory(payload) {
    //console.log(payload)

    return async function (dispatch) {
        var json = await axios.get('http://localhost:9000/history', { params: payload });
        //console.log(json);
        return json.data

    }
}
export function updateSettings(payload) {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/updatesettings', payload)
        return dispatch({
            type: 'UPDATE_SETTINGS',
            payload: json
        })
    }
}
export function updateSettingsNewUser(payload) {
    console.log(payload)
    return async function (dispatch) {
        const json = await axios.post('http://localhost:9000/updatesettingsNewUser', payload)
        return dispatch({
            type: 'UPDATE_SETTINGS_NEW_USER',
            payload: json
        })
    }
}

export function getSettings() {
    return async function (dispatch) {
        var json = await axios('http://localhost:9000/getSettings', {});
        //console.log(json)
        return dispatch({
            type: 'GET_SETTINGS_NEW_USER',
            payload: json.data
        })
    }
}





