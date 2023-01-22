export const getAuthSelector = (state) => {
  return state.auth.status;
};
export const getTokenSelector = (state) => {
  return state.auth.token;
};