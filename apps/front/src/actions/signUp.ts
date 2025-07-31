'use server'

import { TSignUpInput, TTokenResponse } from '@/types/auth'
import { fetchGraphQL } from '@/libs/fetchGraphQl'
import { SIGN_UP } from '@/libs/gqlQueries'

export const signUp = async (input: TSignUpInput): Promise<{ signUp: TTokenResponse }> => {
  const data = await fetchGraphQL(SIGN_UP.loc?.source.body!, input)
  return data
}
