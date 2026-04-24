export const MOCK_AUTH_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: 'admin789',
} as const

export const INVALID_CREDENTIALS_MESSAGE = 'Mock email or password is incorrect.'

export function normalizeRedirectPath(redirectTo?: string): string {
  if (!redirectTo) return '/'

  try {
    const url = new URL(redirectTo, window.location.origin)
    const normalizedPath = `${url.pathname}${url.search}${url.hash}`

    return normalizedPath.startsWith('/') ? normalizedPath : '/'
  } catch {
    return redirectTo.startsWith('/') ? redirectTo : '/'
  }
}
