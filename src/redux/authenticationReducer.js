import { sendPhoneNumber } from '../api/request';

const AUTH = 'AUTH';

export const initialState = {
  status: false,
  token: undefined,
}

export const actionCreatorAuth = (boolean) => ({type: AUTH, boolean});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH: {
      return {...state, status: action.boolean}
    }
    default: {
      return state;
    }
  }
}

export const authThunk = (phone) => (dispath) => {
  sendPhoneNumber(phone)
    .then(boolean => {
      dispath(actionCreatorAuth(boolean));
    })
  //ВЫПОЛНЕНИЕ ЗАПРОСА НА СЕРВЕР, ПРОВЕРКА И ДОБАВЛЕНИЕ ДАННЫХ
}