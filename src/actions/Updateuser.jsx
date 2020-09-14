
export const setId = (value) => ({
  type: "SET_ID",
  payload: value,
});

export const setFirstname = (value) => ({
    type: "SET_FIRST_NAME",
    payload: value,
  });
    
  export const setLastname = (value) => ({
    type: "SET_LAST_NAME",
    payload: value,
  });
  
  export const setEmail = (value) => ({
    type: "SET_EMAIL",
    payload: value,
  });
  
  export const setPassword = (value) => ({
    type: "SET_PASSWORD",
    payload: value,
  });
  
  export const setPhoneNumber = (value) => ({
    type: "SET_PHONE_NUMBER",
    payload: value,
  });
  
  export const setFirstnameError = (value) => ({
    type: "SET_FIRST_NAME_ERROR",
    payload: value,
  });

  export const setLastnameError = (value) => ({
      type: "SET_LAST_NAME_ERROR",
      payload: value,
  });

  export const setPhoneNumberError = (value) => ({
      type: "SET_PHONE_NUMBER_ERROR",
      payload: value,
  });

  export const setPasswordError = (value) => ({
    type: "SET_PASSWORD_ERROR",
    payload: value,
  });

  export const setEmailError = (value) => ({
    type: "SET_EMAIL_ERROR",
    payload: value,
  })