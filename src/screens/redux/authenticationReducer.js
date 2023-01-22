const AUTH = 'AUTH';

export const initialState = {
  auth: false,
  token: undefined,
}

export const actionCreatorAuth = (boolean) => ({type: AUTH, boolean});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH: {
      return {...state, auth: action.boolean}
    }
  }
}

export const authThunk = (boolean) => (despath) => {
  //ВЫПОЛНЕНИЕ ЗАПРОСА НА СЕРВЕР, ПРОВЕРКА И ДОБАВЛЕНИЕ ДАННЫХ
}