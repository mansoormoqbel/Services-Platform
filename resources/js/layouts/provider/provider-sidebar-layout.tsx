import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { ProviderSidebar } from '@/components/provider-sidebar';
import { ProviderSidebarHeader } from '@/components/provider-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function ProviderSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <ProviderSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <ProviderSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
