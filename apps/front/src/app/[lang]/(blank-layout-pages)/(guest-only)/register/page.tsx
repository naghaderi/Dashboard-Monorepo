import { getServerMode } from '@core/utils/serverHelpers'

import Register from '@views/Register'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const RegisterPage = async () => {
  const mode = await getServerMode()
  return <Register mode={mode} />
}

export default RegisterPage
