import { Link } from '@inertiajs/react';
import {
    Globe2,
    Images,
    LayoutGrid,
    Newspaper,
    Package,
    Users2,
    Wrench,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import dashboardRoutes from '@/routes/dashboard';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Klien',
        href: dashboardRoutes.clients.index(),
        icon: Users2,
    },
    {
        title: 'Layanan',
        href: dashboardRoutes.services.index(),
        icon: Wrench,
    },
    {
        title: 'Produk',
        href: dashboardRoutes.products.index(),
        icon: Package,
    },
    {
        title: 'Galeri',
        href: dashboardRoutes.gallery.index(),
        icon: Images,
    },
    {
        title: 'Artikel',
        href: dashboardRoutes.articles.index(),
        icon: Newspaper,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat Website',
        href: '/',
        icon: Globe2,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
