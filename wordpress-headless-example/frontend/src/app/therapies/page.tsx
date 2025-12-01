import { getCustomPosts } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import StaggerContainer from '@/components/StaggerContainer';
import TiltCard from '@/components/TiltCard';
import TextReveal from '@/components/TextReveal';
import Link from 'next/link';
import SkeletonCard from '@/components/SkeletonCard';

export default async function TherapiesPage() {
    const services = await getCustomPosts('service');

    return (
        <div className="min-h-screen bg-brand-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-gradient-to-br from-brand-800 to-brand-900 text-white pt-28 md:pt-32 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <TextReveal
                        className="text-5xl md:text-6xl font-serif font-medium mb-6 text-white drop-shadow-2xl justify-center"
                    >
                        Our Services
                    </TextReveal>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        Holistic healing therapies tailored to your needs
                    </p>
                </div>
            </AnimatedSection>

            {/* Services Grid */}
            <AnimatedSection className="py-20 px-6 bg-brand-50">
                <div className="container mx-auto max-w-6xl">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.length > 0 ? (
                            services.map((service: any, index: number) => (
                                <TiltCard key={service.id} delay={index * 0.1}>
                                    <AnimatedCard
                                        delay={index * 0.1}
                                        href={`/service/${service.slug}`}
                                        className="bg-white/90 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-brown-100 hover:border-brown-300 h-full"
                                    >
                                        <div className="w-14 h-14 bg-brown-100 rounded-xl flex items-center justify-center mb-6 text-brown-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-serif mb-3 text-brand-900">{service.title.rendered}</h3>
                                        {service.meta?.service_tagline && (
                                            <p className="text-brown-600 font-medium mb-4">{service.meta.service_tagline}</p>
                                        )}
                                        <div
                                            className="text-brand-700 mb-6 line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: service.excerpt?.rendered || service.content.rendered }}
                                        />
                                        {service.meta?.price_range && (
                                            <p className="text-brown-600 font-semibold mb-4">Price: {service.meta.price_range}</p>
                                        )}
                                        <div className="inline-flex items-center text-orange-500 font-medium hover:text-orange-600 transition-colors">
                                            Learn more <span className="ml-2">→</span>
                                        </div>
                                    </AnimatedCard>
                                </TiltCard>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 bg-white rounded-lg border border-dashed border-stone-300">
                                <p className="text-stone-500">No services found. Please add some in WordPress.</p>
                            </div>
                        )}
                    </StaggerContainer>
                </div>
            </AnimatedSection>
        </div>
    );
}
