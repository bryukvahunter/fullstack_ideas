import Cookie from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { trpc } from '@/lib/create-trpc'
import { Loader } from '@/shared/components/loader'
import { routes } from '@/shared/routes'

export function SignOutPage() {
  const navigate = useNavigate()

  const trpcUtils = trpc.useUtils()

  useEffect(() => {
    Cookie.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(routes.getSignIn())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Loader type={'page'} />
}
