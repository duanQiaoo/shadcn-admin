import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { isAuthSessionValid, useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const { user, accessToken, reset } = useAuthStore.getState().auth

    if (isAuthSessionValid(user, accessToken)) {
      return
    }

    reset()

    throw redirect({
      to: '/signin',
      search: { redirect: location.href },
      replace: true,
    })
  },
  component: AuthenticatedLayout,
})
