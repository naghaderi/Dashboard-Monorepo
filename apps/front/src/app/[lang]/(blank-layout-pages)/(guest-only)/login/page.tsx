import { getServerMode } from '@core/utils/serverHelpers'
import type { Metadata } from 'next'

import Login from '@views/Login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = async () => {
  const mode = await getServerMode()
  return <Login mode={mode} />
}

export default LoginPage
