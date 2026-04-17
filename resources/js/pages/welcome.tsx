import Navbar from '@/components/custom/Navbar';
import Whatsapp from '@/components/custom/Whatsapp';
import Articles from '@/section/Articles';
import Clients from '@/section/Clients';
import FinalCta from '@/section/FinalCta';
import Gallery from '@/section/Gallery';
import Hero from '@/section/Hero';
import Products from '@/section/Products';
import Services from '@/section/Services';
import Workflow from '@/section/Workflow';

interface ClientItem {
    id: number;
    name: string;
    logo: string;
    url?: string | null;
}

interface ServiceItem {
    id: number;
    slug: string;
    title: string;
    description: string;
    longDescription?: string | null;
    image: string;
    gallery: string[];
    features: string[];
}

interface ProductItem {
    id: number;
    slug: string;
    name: string;
    description: string;
    longDescription?: string | null;
    price: string;
    image: string;
    gallery: string[];
    features: string[];
}

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    location?: string | null;
    image: string;
    description?: string | null;
}

interface ArticleItem {
    id: number;
    slug: string;
    title: string;
    excerpt?: string | null;
    category?: string | null;
    date?: string | null;
    readTime?: string | null;
    image?: string | null;
}

interface WelcomeProps {
    clients: ClientItem[];
    services: ServiceItem[];
    products: ProductItem[];
    galleryItems: GalleryItem[];
    articleItems: ArticleItem[];
}

export default function Welcome({
    clients,
    services,
    products,
    galleryItems,
    articleItems,
}: WelcomeProps) {
    return (
        <>
            <Navbar transparent />
            <main>
                <Hero />
                <Clients clients={clients} />
                <Services services={services} />
                <Workflow />
                <Products products={products} />
                <Gallery items={galleryItems} />
                <Articles articles={articleItems} />
                <FinalCta />
            </main>
            <Whatsapp />
        </>
    );
}
