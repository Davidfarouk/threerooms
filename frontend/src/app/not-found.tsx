import Link from 'next/link';
import AnimatedButton from '@/components/AnimatedButton';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
            <div className="text-center max-w-2xl">
                <h1 className="text-6xl md:text-8xl font-serif font-bold text-medical-600 mb-4">404</h1>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Page Not Found</h2>
                <p className="text-xl text-stone-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedButton href="/" variant="primary" size="lg">
                        Go Home
                    </AnimatedButton>
                    <AnimatedButton href="/therapies" variant="outline" size="lg">
                        Browse Services
                    </AnimatedButton>
                </div>
            </div>
        </div>
    );
}

