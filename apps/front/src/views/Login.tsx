'use client'

import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { TCheckOtpInput, TSendOtpInput } from '@/types/auth'
import { Button, Typography, Alert } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { getLocalizedUrl } from '@/utils/i18n'
import { useMutation } from '@tanstack/react-query'
import { useSettings } from '@core/hooks/useSettings'
import { SystemMode } from '@/@core/types'
import { useState } from 'react'
import { checkOtp } from '@/actions/checkOtp'
import { useForm } from 'react-hook-form'
import { sendOtp } from '@/actions/sendOtp'
import { Locale } from '@/configs/i18n'

import CustomTextField from '@core/components/mui/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import classnames from 'classnames'
import themeConfig from '@configs/themeConfig'
import Logo from '@components/layout/shared/Logo'

const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: { maxBlockSize: 550 },
  [theme.breakpoints.down('lg')]: { maxBlockSize: 450 }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const FlipContainer = styled('div')({
  perspective: '1000px'
})

const FlipCardInner = styled('div')<{ flipped: boolean }>(({ flipped }) => ({
  position: 'relative',
  width: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
}))

const FlipCardFace = styled('div')({
  position: 'absolute',
  width: '100%',
  backfaceVisibility: 'hidden',
  top: 0,
  left: 0
})

const FlipCardBack = styled(FlipCardFace)({
  transform: 'rotateY(180deg)'
})

type Step = 'SEND_OTP' | 'CHECK_OTP'

const Login = ({ mode }: { mode: SystemMode }) => {
  // ========== Hooks =========
  const searchParams = useSearchParams()
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const router = useRouter()

  // ========== Theme =========
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ========== Form State =========
  const [step, setStep] = useState<Step>('SEND_OTP')
  const [mobileStored, setMobileStored] = useState('')
  const [error, setError] = useState<string | null>(null)
  const authBackground = useImageVariant(mode, '/images/pages/auth-mask-light.png', '/images/pages/auth-mask-dark.png')
  const characterIllustration = useImageVariant(
    mode,
    '/images/illustrations/auth/v2-login-light.png',
    '/images/illustrations/auth/v2-login-dark.png',
    '/images/illustrations/auth/v2-login-light-border.png',
    '/images/illustrations/auth/v2-login-dark-border.png'
  )

  // ========== Form Handlers =========
  const sendForm = useForm<TSendOtpInput>()
  const checkForm = useForm<TCheckOtpInput>({ defaultValues: { mobile: mobileStored } })

  // ========== Mutations =========
  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: (_, vars) => {
      setMobileStored(vars.mobile)
      setStep('CHECK_OTP')
      setError(null)
    },
    onError: err => setError(err.message || 'Send OTP failed')
  })

  const checkOtpMutation = useMutation({
    mutationFn: checkOtp,
    onSuccess: data => {
      console.log('✅ OTP verified, received data:', data)
      localStorage.setItem('accessToken', data.checkOtp.accessToken)
      localStorage.setItem('refreshToken', data.checkOtp.refreshToken)
      const redirectURL = searchParams.get('redirectTo') ?? '/'
      router.replace(getLocalizedUrl(redirectURL, locale as Locale))
    },
    onError: err => {
      console.error('❌ OTP verification error:', err)
      setError(err.message || 'OTP verification failed')
    }
  })

  // ========== Render =========
  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>
        <div className='flex flex-col gap-6 is-full sm:max-is-[400px] mbs-8 sm:mbs-11 md:mbs-0'>
          <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
          <Typography>Please log in with your mobile number</Typography>
          {error && <Alert severity='error'>{error}</Alert>}

          <FlipContainer>
            <FlipCardInner flipped={step === 'CHECK_OTP'}>
              <FlipCardFace>
                <form className='flex flex-col gap-6' onSubmit={sendForm.handleSubmit(sendOtpMutation.mutate)}>
                  <CustomTextField
                    fullWidth
                    label='Username'
                    {...sendForm.register('username', { required: 'Username is required' })}
                    error={!!sendForm.formState.errors.username}
                    helperText={sendForm.formState.errors.username?.message}
                  />
                  <CustomTextField
                    fullWidth
                    label='Mobile'
                    {...sendForm.register('mobile', { required: 'Mobile is required' })}
                    error={!!sendForm.formState.errors.mobile}
                    helperText={sendForm.formState.errors.mobile?.message}
                  />
                  <Button type='submit' fullWidth variant='contained'>
                    Send OTP
                  </Button>
                </form>
              </FlipCardFace>

              <FlipCardBack>
                <form className='flex flex-col gap-6' onSubmit={checkForm.handleSubmit(checkOtpMutation.mutate)}>
                  <CustomTextField
                    fullWidth
                    label='Mobile'
                    defaultValue={mobileStored}
                    {...checkForm.register('mobile', { required: 'Mobile is required' })}
                    error={!!checkForm.formState.errors.mobile}
                    helperText={checkForm.formState.errors.mobile?.message}
                  />
                  <CustomTextField
                    fullWidth
                    label='OTP Code'
                    {...checkForm.register('code', { required: 'OTP code is required' })}
                    error={!!checkForm.formState.errors.code}
                    helperText={checkForm.formState.errors.code?.message}
                  />
                  <Button type='submit' fullWidth variant='contained'>
                    Verify & Login
                  </Button>
                  <Button type='button' variant='text' onClick={() => setStep('SEND_OTP')}>
                    Back
                  </Button>
                </form>
              </FlipCardBack>
            </FlipCardInner>
          </FlipContainer>
        </div>
      </div>
    </div>
  )
}

export default Login
