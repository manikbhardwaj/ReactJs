/* eslint-disable */

import { validateAll } from 'indicative';
import axios from 'axios';
import config from '../config';

export default class AuthService {
  async registerUser(data) {
    // validating form data
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed'
    };

    const messages = {
      required: 'This {{ field }} is required',
      'email.email': 'The email is invalid',
      'password.min': 'The {{ field }} field must be 6 characters long.',
      'password.confirmed': 'The password confirmation does not match.'
    };

    try {
      await validateAll(data, rules, messages)

      const response = await axios.post(`${config.apiUrl}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password
      })

      return response.data.data;

      localStorage.setItem('user', JSON.stringify(response.data.data))
      this.props.setAuthUser(response.data.data)
      this.props.history.push('/');
      } catch (errors) {
    // console.log(errors.response)

        const formattedErrors = {};
        if (errors.response && errors.response.status === 422) {
        // eslint-disable-next-line
          formattedErrors['email'] = errors.response.data['email'][0];

          return Promise.reject(formattedErrors);
        }
        errors.forEach(error => formattedErrors[error.field] = error.message)

      return Promise.reject(formattedErrors)
      }
  }

  async loginUser(data) {
    // validating form data
    const rules = {
      email: 'required|email',
      password: 'required|string'
    };

    const messages = {
      required: 'This {{ field }} is required',
      'email.email': 'The email is invalid',
    };

    try {
      await validateAll(data, rules, messages)

      const response = await axios.post(`${config.apiUrl}/auth/login`, {
        email: data.email,
        password: data.password
      })

      return response.data.data;

      localStorage.setItem('user', JSON.stringify(response.data.data))
      this.props.setAuthUser(response.data.data)
      this.props.history.push('/');
      } catch (errors) {
    // console.log(errors.response)

        const formattedErrors = {};
        if (errors.response && errors.response.status === 401) {
        // eslint-disable-next-line
          formattedErrors['email'] = 'Invalid credentials';

          return Promise.reject(formattedErrors);
        }
        errors.forEach(error => formattedErrors[error.field] = error.message)

      return Promise.reject(formattedErrors)
      }
  }
}
