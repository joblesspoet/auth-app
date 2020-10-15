
const initialState = {
    user: {},
    is_logged_in: false,
    is_loading: false,
    lastError: undefined,
    hasError: false
  };

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
          return{
            ...state,
            is_loading: true  
          }
        
        case "LOGIN_FAILURE":
          return{
            ...state,
            is_loading: false,
            hasError: true,
            lastError: action.payload  
        }
    
        case "SET_USER":
          return{
            ...state,
            is_loading: false,
            hasError: false,
            lastError: undefined,
            is_logged_in: true,
            user: action.payload
        }

        case "LOGIN_SUCCESS":
          return{
            ...state,
            is_loading: false,
            hasError: false,
            lastError: undefined,
            is_logged_in: true,
            user: action.user
        }
    
        case "LOGOUT":
          return {
            ...state,
            is_loading: true,
          }
    
        case "LOGOUT_FAILURE":
          return{
            ...state,        
            hasError: true,
            lastError: action.payload,
            is_loading: false,
        }    
        
        case "LOGOUT_SUCCESS":
          return state;
                
        default:
          return state;
      }
}

export default currentUser;