'use client'

import { styled, useTheme } from '@mui/material/styles'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { getLocalizedUrl } from '@/utils/i18n'
import { useMutation } from '@tanstack/react-query'
import { useSettings } from '@core/hooks/useSettings'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import FormControlLabel from '@mui/material/FormControlLabel'
import CustomTextField from '@core/components/mui/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import classnames from 'classnames'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Logo from '@components/layout/shared/Logo'
import { signUp } from '@/actions/signUp'

const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 600,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 345,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const Register = ({ mode }: { mode: 'light' | 'dark' }) => {
  // ========== States ==========
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile: ''
  })
  const [agreed, setAgreed] = useState(false)

  // ========== Constants ==========
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-register-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-register-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-register-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-register-light-border.png'

  // ========== Hooks ==========
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const {
    mutate: handleSignUp,
    isPending,
    error
  } = useMutation({
    mutationFn: () => signUp(formData),
    onSuccess: data => {
      console.log('Registered:', data)
      alert('Registration successful!')
    },
    onError: err => {
      console.error('Signup error:', err)
    }
  })

  // ========== Handlers ==========
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      alert('Please accept the terms.')
      return
    }
    handleSignUp()
  }

  // ========== Render ==========
  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          { 'border-ie': settings.skin === 'bordered' }
        )}
      >
        <RegisterIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/login', locale as string)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>Adventure starts here 🚀</Typography>
            <Typography>Make your app management easy and fun!</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <CustomTextField
              autoFocus
              fullWidth
              name='first_name'
              label='First Name'
              placeholder='Enter your first name'
              value={formData.first_name}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              name='last_name'
              label='Last Name'
              placeholder='Enter your last name'
              value={formData.last_name}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              name='mobile'
              label='Mobile'
              placeholder='09123456789'
              value={formData.mobile}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              name='email'
              label='Email'
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
            />
            <CustomTextField
              fullWidth
              name='password'
              label='Password'
              placeholder='············'
              type={isPasswordShown ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />
            <CustomTextField
              fullWidth
              name='confirm_password'
              label='Confirm Password'
              placeholder='············'
              type='password'
              value={formData.confirm_password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={e => setAgreed(e.target.checked)} />}
              label={
                <>
                  <span>I agree to </span>
                  <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                    privacy policy & terms
                  </Link>
                </>
              }
            />
            <Button fullWidth variant='contained' type='submit' disabled={isPending}>
              {isPending ? 'Registering...' : 'Sign Up'}
            </Button>
            {error && (
              <Typography color='error.main' variant='body2'>
                Registration failed. Please try again.
              </Typography>
            )}
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Already have an account?</Typography>
              <Typography component={Link} href={getLocalizedUrl('/login', locale as string)} color='primary.main'>
                Sign in instead
              </Typography>
            </div>
            <Divider className='gap-2'>or</Divider>
            <div className='flex justify-center items-center gap-1.5'>
              <IconButton className='text-facebook' size='small'>
                <i className='tabler-brand-facebook-filled' />
              </IconButton>
              <IconButton className='text-twitter' size='small'>
                <i className='tabler-brand-twitter-filled' />
              </IconButton>
              <IconButton className='text-textPrimary' size='small'>
                <i className='tabler-brand-github-filled' />
              </IconButton>
              <IconButton className='text-error' size='small'>
                <i className='tabler-brand-google-filled' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
