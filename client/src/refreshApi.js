import axios from 'axios'
import {useAuthHeader, createRefresh} from 'react-auth-kit'

const refreshApi = createRefresh({
  interval: 10,   // Refreshs the token in every 10 minutes
  refreshApiCallback: async (
    {   // arguments
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
    try {
      const response = await axios.post("/refresh", {'refresh': refreshToken}, {
        headers: {'Authorization': `Bearer ${authToken}`}}
      )
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      }
    }
    catch(error){
      console.error(error)
      return {
        isSuccess: false
      } 
    }    
  }
})

export default refreshApi