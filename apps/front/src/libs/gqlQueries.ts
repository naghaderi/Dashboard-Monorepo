import gql from 'graphql-tag'

export const SEND_OTP = gql`
  mutation SendOtp($username: String!, $mobile: String!) {
    sendOtp(input: { username: $username, mobile: $mobile }) {
      message
    }
  }
`

export const CHECK_OTP = gql`
  mutation CheckOtp($mobile: String!, $code: String!) {
    checkOtp(input: { mobile: $mobile, code: $code }) {
      accessToken
      refreshToken
      message
    }
  }
`

export const SIGN_UP = gql`
  mutation SignUp(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $confirm_password: String!
    $mobile: String!
  ) {
    signUp(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        confirm_password: $confirm_password
        mobile: $mobile
      }
    ) {
      accessToken
      refreshToken
      message
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      accessToken
      refreshToken
      message
    }
  }
`
