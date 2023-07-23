const userReducer = (
  state = {
    loggedIn: false,
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };

    default:
      return state;
  }
};

export default userReducer;
