  
  export const initialState = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    passwordError: "",
    first_name_error: "",
    last_name_error: "",
    email_error:"",
    phone_number_error:"",
  };
  
  export function updateuser(state = initialState, action) {
    switch(action.type) {
      case "SET_ID":
        return { ...state, id: action.payload };
      case "SET_FIRST_NAME":
        return { ...state, first_name: action.payload };
      case "SET_LAST_NAME":
        return { ...state, last_name: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_PHONE_NUMBER":
        return { ...state, phone_number: action.payload };  
      case "SET_PASSWORD_ERROR":  
        return {...state, passwordError: action.payload};
      case "SET_FIRST_NAME_ERROR":
        return { ...state, firstnameError: action.payload };
      case "SET_LAST_NAME_ERROR":
        return { ...state, lastnameError: action.payload };  
      case "SET_EMAIL_ERROR":
        return { ...state, emailError:action.payload };
      case "SET_PHONE_NUMBER_ERROR":
        return { ...state, phoneNumberError:action.payload };  
      default:
        return state;
    }
  }
  