import Clients from '@/section/Clients';
import Hero from '@/section/Hero';
import Products from '@/section/Products';
import Services from '@/section/Services';
import Workflow from '@/section/Workflow';
import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Beranda">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <Navbar transparent />
            <Hero />
            <Clients />
            <Services />
            <Workflow />
            <Products />
            <Whatsapp />
        </>
    );
}
