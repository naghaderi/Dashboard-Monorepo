'use server'

import { TCheckOtpInput, TTokenResponse } from '@/types/auth'
import { fetchGraphQL } from '@/libs/fetchGraphQl'
import { CHECK_OTP } from '@/libs/gqlQueries'

export const checkOtp = async (input: TCheckOtpInput): Promise<TTokenResponse> => {
  const data = await fetchGraphQL(CHECK_OTP.loc?.source.body!, input)
  console.log('✅ CHECK_OTP result:', data)
  return { checkOtp: data.checkOtp }
}
