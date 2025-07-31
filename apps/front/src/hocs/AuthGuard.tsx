'use client'

import { useEffect, useState } from 'react'
import { getLocalizedUrl } from '@/utils/i18n'
import { useRouter } from 'next/navigation'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  // ======== States ========
  const [authenticated, setAuthenticated] = useState(false)

  // ======== Effects ========
  const router = useRouter()

  // ========= Check Authentication ========
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) router.replace(getLocalizedUrl('/login', locale))
    else setAuthenticated(true)
  }, [locale, router])

  // ========= Render =========
  return authenticated ? <>{children}</> : null
}
