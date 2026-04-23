import { Link } from '@tanstack/react-router'
import { Command } from 'lucide-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function AppTitle() {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          asChild
        >
          <div className='flex items-center gap-3'>
            <div className='flex aspect-square size-8 items-center justify-center rounded-sm bg-sidebar-primary'>
              <Command className='size-6 shrink-0' />
            </div>
            <Link
              to='/'
              onClick={() => setOpenMobile(false)}
              className='grid flex-1 text-start text-sm leading-tight'
            >
              <span className='truncate font-bold'>Shadcn-Admin</span>
              <span className='truncate text-xs'>Vite + ShadcnUI</span>
            </Link>
         
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
