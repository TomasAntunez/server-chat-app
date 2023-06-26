import { CustomError } from '../';


type loginValues = {
  email: string;
  password: string;
}

export const getLoginErrors = ({ email, password }: loginValues): Array<CustomError> => {
  return [
    {
      location: "body",
      msg: "The email or the password are wrong",
      param: "email",
      value: email
    },
    {
      location: "body",
      msg: "The email or the password are wrong",
      param: "password",
      value: password
    }
  ];
};


export const getAuthErrors = (token?: string): Array<CustomError> => {
  return [
    {
      msg: 'Invalid access',
      value: token || ''
    }
  ]
}
