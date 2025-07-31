import { getSystemMode } from '@core/utils/serverHelpers'
import { headers } from 'next/headers'
import { i18n } from '@configs/i18n'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import TranslationWrapper from '@/hocs/TranslationWrapper'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

import 'react-perfect-scrollbar/dist/css/styles.css'
import '@assets/iconify-icons/generated-icons.css'
import '@/app/globals.css'

export const metadata = {
  title: 'Vuexy - MUI Next.js Admin Dashboard Template',
  description:
    'Vuexy - MUI Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.'
}

const RootLayout = async (props: ChildrenType & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params

  const { children } = props

  const headersList = await headers()
  const systemMode = await getSystemMode()
  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id='__next' lang={params.lang} dir={direction} suppressHydrationWarning>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <ReactQueryProvider>
            <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
            {children}
          </ReactQueryProvider>
        </body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout
