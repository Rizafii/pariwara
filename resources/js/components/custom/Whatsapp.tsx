export default function Whatsapp() {
    return (
        <div className="fixed right-4 bottom-4 z-50 lg:right-12 lg:bottom-12">
            <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/logo/wa.svg"
                    alt="WhatsApp"
                    className="h-16 w-16 rounded-full bg-green-500 fill-white p-2.5 transition-all duration-300 ease-in-out hover:scale-110"
                />
            </a>
        </div>
    );
}
