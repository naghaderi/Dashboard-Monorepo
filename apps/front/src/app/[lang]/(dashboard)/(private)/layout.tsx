import { getMode, getSystemMode } from '@core/utils/serverHelpers'
import { getDictionary } from '@/utils/getDictionary'
import { i18n } from '@configs/i18n'

import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

import HorizontalFooter from '@components/layout/horizontal/Footer'
import HorizontalLayout from '@layouts/HorizontalLayout'
import VerticalLayout from '@layouts/VerticalLayout'
import VerticalFooter from '@components/layout/vertical/Footer'
import LayoutWrapper from '@layouts/LayoutWrapper'
import ScrollToTop from '@core/components/scroll-to-top'
import Navigation from '@components/layout/vertical/Navigation'
import Customizer from '@core/components/customizer'
import AuthGuard from '@/hocs/AuthGuard'
import Providers from '@components/Providers'
import Button from '@mui/material/Button'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'

const Layout = async (props: ChildrenType & { params: Promise<{ lang: Locale }> }) => {
  const params = await props.params
  const { children } = props
  const direction = i18n.langDirection[params.lang]
  const dictionary = await getDictionary(params.lang)
  const mode = await getMode()
  const systemMode = await getSystemMode()

  // ========= Layouts =========
  return (
    <Providers direction={direction}>
      <AuthGuard locale={params.lang}>
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <VerticalLayout
              navigation={<Navigation dictionary={dictionary} mode={mode} />}
              navbar={<Navbar />}
              footer={<VerticalFooter />}
            >
              {children}
            </VerticalLayout>
          }
          horizontalLayout={
            <HorizontalLayout header={<Header dictionary={dictionary} />} footer={<HorizontalFooter />}>
              {children}
            </HorizontalLayout>
          }
        />
        <ScrollToTop className='mui-fixed'>
          <Button
            variant='contained'
            className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
          >
            <i className='tabler-arrow-up' />
          </Button>
        </ScrollToTop>
        <Customizer dir={direction} />
      </AuthGuard>
    </Providers>
  )
}

export default Layout
