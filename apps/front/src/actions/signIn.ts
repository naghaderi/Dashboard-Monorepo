'use server'

import { TSignInInput, TTokenResponse } from '@/types/auth'
import { fetchGraphQL } from '@/libs/fetchGraphQl'
import { SIGN_IN } from '@/libs/gqlQueries'

export const signIn = async (input: TSignInInput): Promise<{ signIn: TTokenResponse }> => {
  const data = await fetchGraphQL(SIGN_IN.loc?.source.body!, input)
  return data
}
