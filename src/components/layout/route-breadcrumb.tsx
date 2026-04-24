import { Link, useLocation } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/apps': 'Apps',
  '/chats': 'Chats',
  '/help-center': 'Help Center',
  '/settings': 'Settings',
  '/settings/account': 'Account',
  '/settings/appearance': 'Appearance',
  '/settings/display': 'Display',
  '/settings/notifications': 'Notifications',
  '/tasks': 'Tasks',
  '/users': 'Users',
}

function getLabel(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  return routeLabels[pathname] ?? segments[segments.length - 1] ?? ''
}

export function RouteBreadcrumb({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = useLocation({ select: (location) => location.pathname })

  const crumbs =
    pathname === '/'
      ? [{ label: 'Home', to: '/' }]
      : [
          { label: 'Home', to: '/' },
          ...pathname
            .split('/')
            .filter(Boolean)
            .map((segment, index, segments) => {
              const to = `/${segments.slice(0, index + 1).join('/')}`
              return {
                label: getLabel(to || `/${segment}`),
                to,
              }
            }),
        ]

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <BreadcrumbItem key={crumb.to}>
              {isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={crumb.to}>{crumb.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
