export type TSendOtpInput = {
  username: string
  mobile: string
}

export type TCheckOtpInput = {
  mobile: string
  code: string
}

export type TSendOtpResponse = {
  sendOtp: {
    message: string
  }
}

export type TTokenResponse = {
  checkOtp: {
    accessToken: string
    refreshToken: string
    message: string
  }
}
