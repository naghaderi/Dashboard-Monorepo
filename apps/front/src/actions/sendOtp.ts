'use server'

import { TSendOtpInput, TSendOtpResponse } from '@/types/auth'
import { fetchGraphQL } from '@/libs/fetchGraphQl'
import { SEND_OTP } from '@/libs/gqlQueries'

export const sendOtp = async (input: TSendOtpInput): Promise<TSendOtpResponse> => {
  return await fetchGraphQL(SEND_OTP.loc?.source.body!, input)
}
