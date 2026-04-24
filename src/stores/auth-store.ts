import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN_COOKIE = 'auth_access_token'
const AUTH_USER_COOKIE = 'auth_user'

export interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

export function isAuthSessionValid(
  user: AuthUser | null,
  accessToken: string
): boolean {
  return Boolean(user && accessToken && user.exp > Date.now())
}

function readCookieValue<T>(name: string): T | null {
  const cookieValue = getCookie(name)
  if (!cookieValue) return null

  try {
    return JSON.parse(cookieValue) as T
  } catch {
    removeCookie(name)
    return null
  }
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const persistedToken = readCookieValue<string>(ACCESS_TOKEN_COOKIE) ?? ''
  const persistedUser = readCookieValue<AuthUser>(AUTH_USER_COOKIE)

  const initToken = isAuthSessionValid(persistedUser, persistedToken)
    ? persistedToken
    : ''
  const initUser = isAuthSessionValid(persistedUser, persistedToken)
    ? persistedUser
    : null

  if (!initToken) {
    removeCookie(ACCESS_TOKEN_COOKIE)
    removeCookie(AUTH_USER_COOKIE)
  }

  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => {
          if (user) {
            setCookie(AUTH_USER_COOKIE, JSON.stringify(user))
          } else {
            removeCookie(AUTH_USER_COOKIE)
          }
          return { ...state, auth: { ...state.auth, user } }
        }),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN_COOKIE, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN_COOKIE)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN_COOKIE)
          removeCookie(AUTH_USER_COOKIE)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
    },
  }
})
