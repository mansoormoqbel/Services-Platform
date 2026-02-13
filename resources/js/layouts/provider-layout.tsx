import ProviderLayoutTemplate from '@/layouts/provider/provider-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <ProviderLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </ProviderLayoutTemplate>
);
