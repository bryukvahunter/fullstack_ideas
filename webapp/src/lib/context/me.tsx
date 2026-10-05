import type { TrpcRouterOutput } from '@fullstack/backend/src/router'
import { createContext, useContext } from 'react'
import { trpc } from '../create-trpc'

export type AppContext = {
  me: TrpcRouterOutput['getMe']['me']
}

const AppReactContext = createContext<AppContext>({
  me: null,
})

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError, error } = trpc.getMe.useQuery()

  if (isLoading) {
    return <p>...Loading</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <AppReactContext.Provider
      value={{
        me: data?.me || null,
      }}
    >
      {children}
    </AppReactContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppReactContext)
}

export function useMe() {
  const { me } = useAppContext()
  return me
}
