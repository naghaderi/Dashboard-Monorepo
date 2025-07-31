'use client'

import { redirect, usePathname } from 'next/navigation'
import { getLocalizedUrl } from '@/utils/i18n'

import type { Locale } from '@configs/i18n'

import themeConfig from '@configs/themeConfig'

const AuthRedirect = ({ lang }: { lang: Locale }) => {
  // ======== Get the current pathname ========
  const pathname = usePathname()
  // ======== Define the redirect URLs ========
  const redirectUrl = `/${lang}/login?redirectTo=${pathname}`
  const login = `/${lang}/login`
  const homePage = getLocalizedUrl(themeConfig.homePageUrl, lang)

  // ======== Check if the user is authenticated ========
  return redirect(pathname === login ? login : pathname === homePage ? login : redirectUrl)
}

export default AuthRedirect
