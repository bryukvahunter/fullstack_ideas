import type { UseTRPCQueryResult, UseTRPCQuerySuccessResult } from '@trpc/react-query/shared'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext, type AppContext } from '../context/me'
import { NotFoundPage } from '@/pages/other/not-found-page'
import { routes } from '@/shared/routes'

class CheckExistsError extends Error {}

function checkExistsFn<T>(value: T, message?: string): NonNullable<T> {
  if (!value) {
    throw new CheckExistsError(message)
  }
  return value
}

class CheckAccessError extends Error {}

function checkAccessFn<T>(value: T, message?: string): void {
  if (!value) {
    throw new CheckAccessError(message)
  }
}

type Props = Record<string, any>
type QueryResult = UseTRPCQueryResult<any, any>
type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQuerySuccessResult<
  NonNullable<TQueryResult['data']>,
  null
>

type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext
  queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult> : undefined
}

type SetPropsProps<TQueryResult extends QueryResult | undefined> = HelperProps<TQueryResult> & {
  checkExists: typeof checkExistsFn
  checkAccess: typeof checkAccessFn
}

type PageWrapperProps<TProps extends Props, TQueryResult extends QueryResult | undefined> = {
  redirectAuthorized?: boolean
  authorizedOnly?: boolean
  authorizedOnlyTitle?: string
  authorizedOnlyMessage?: string
  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean
  checkAccessTitle?: string
  checkAccessMessage?: string
  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean
  checkExistsTitle?: string
  checkExistsMessage?: string
  useQuery?: () => TQueryResult
  setProps?: (setPropsProps: SetPropsProps<TQueryResult>) => TProps
  Page: React.FC<TProps>
}

const PageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>({
  authorizedOnly,
  authorizedOnlyTitle = 'Please, authorized',
  authorizedOnlyMessage = 'This page is available only for authorizd users',
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = 'Access dinied',
  checkAccessMessage = 'You have no access to this page',
  checkExists,
  checkExistsTitle,
  checkExistsMessage,
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate()
  const context = useAppContext()
  const queryResult = useQuery?.()

  const redirectNeeded = redirectAuthorized && context.me

  useEffect(() => {
    if (redirectNeeded) {
      navigate(routes.getAllIdeas(), { replace: true })
    }
  }, [redirectNeeded, navigate])

  if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
    return <p>...Loading</p>
  }

  if (queryResult?.error) {
    return <NotFoundPage message={queryResult.error.message} />
  }

  if (authorizedOnly && !context.me) {
    return <NotFoundPage title={authorizedOnlyTitle} message={authorizedOnlyMessage} />
  }

  const helperProps = { ctx: context, queryResult: queryResult as never }

  if (checkExists) {
    const notExists = !checkExists(helperProps)
    if (notExists) {
      return <NotFoundPage title={checkExistsTitle} message={checkExistsMessage} />
    }
  }

  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps)
    if (accessDenied) {
      return <NotFoundPage title={checkAccessTitle} message={checkAccessMessage} />
    }
  }

  try {
    const props = setProps?.({ ...helperProps, checkExists: checkExistsFn, checkAccess: checkAccessFn }) as TProps
    return <Page {...props} />
  } catch (error) {
    if (error instanceof CheckExistsError) {
      return <NotFoundPage title={checkExistsTitle} message={error.message || checkExistsMessage} />
    }

    if (error instanceof CheckAccessError) {
      return <NotFoundPage title={checkAccessTitle} message={error.message || checkAccessMessage} />
    }
    throw error
  }
}

export const withPageWrapper = <TProps extends Props = {}, TQueryResult extends QueryResult | undefined = undefined>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />
  }
}
