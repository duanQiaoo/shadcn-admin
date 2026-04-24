import { z } from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignInPage } from '@/features/auth/sign-in/signin'
import { normalizeRedirectPath } from '@/lib/auth'
import { isAuthSessionValid, useAuthStore } from '@/stores/auth-store'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

function SignInRoute() {
  const { redirect } = Route.useSearch()

  return <SignInPage redirectTo={redirect} />
}

export const Route = createFileRoute('/(auth)/signin')({
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    const { user, accessToken } = useAuthStore.getState().auth

    if (!isAuthSessionValid(user, accessToken)) {
      return
    }

    throw redirect({
      to: normalizeRedirectPath(search.redirect),
      replace: true,
    })
  },
  component: SignInRoute,
})
