import type { PropsWithChildren } from 'react';

import SiteFooter from '@/components/custom/SiteFooter';

export default function MarketingLayout({ children }: PropsWithChildren) {
    return (
        <>
            {children}
            <SiteFooter />
        </>
    );
}