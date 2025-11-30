import { getPageBySlug, getRentalOptions } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import StaggerContainer from '@/components/StaggerContainer';
import AnimatedButton from '@/components/AnimatedButton';
import TextReveal from '@/components/TextReveal';
import TiltCard from '@/components/TiltCard';
import Image from 'next/image';

export default async function HireRoomPage() {
    const page = await getPageBySlug('hire-therapy-room-dorchester');
    const rentalOptions = await getRentalOptions();

    // Process WordPress options - remove duplicates by title (keep first occurrence)
    // Also filter out any options with empty titles
    const uniqueRentalOptions = rentalOptions.length > 0 ? rentalOptions
        .filter((opt: any) => opt.title && opt.title.trim() !== '') // Remove empty titles
        .filter((opt: any, index: number, self: any[]) => 
            // Remove duplicates by title (keep first occurrence)
            index === self.findIndex((o: any) => o.title === opt.title)
        ) : [];
    
    // Fallback to hardcoded if no options from WordPress
    const options = uniqueRentalOptions.length > 0 ? uniqueRentalOptions.map((opt: any) => ({
        title: opt.title,
        description: opt.description || '',
        icon: opt.icon || '',
        image: opt.image_url || opt.featured_image_url || '/resources/Larger Therapy Room + Therapy Couch.jpg',
    })) : [
        {
            title: '1-1 Therapy',
            description: 'We offer two soundproofed therapy rooms, which can be tailored to meet both the needs of talking & physical therapy. We provide a state-of-the-art electronic therapy plinth, offering adjustable features for Osteopathy, Physiotherapy, Massage and other Physical Therapies.',
            icon: '🛋️',
            image: '/resources/Larger Therapy Room + Therapy Couch.jpg',
        },
        {
            title: 'Small Workshops, Seminars & Supervision',
            description: 'Our facility features a large communal area with seating, making it an excellent choice for small workshops, seminars, and group supervision. With availability on weekends, you can host your event at a time that suits you and your attendees.',
            icon: '👥',
            image: '/resources/The Rooms waiting room sofa & desk.jpg',
        },
        {
            title: 'Hire Entire Clinic',
            description: 'With a light & spacious communal area with multiple seating arrangements, a large standing whiteboard and two therapy rooms acting as break out rooms, our clinic is a wonderful cosy space for workshops and presentations. Flexible rental hire including weekend options.',
            icon: '🏢',
            image: '/resources/Reception Desk.jpg',
        },
    ];


    return (
        <div className="min-h-screen bg-brand-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-gradient-to-br from-brand-800 to-brand-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <TextReveal
                        className="text-5xl md:text-6xl font-serif font-medium mb-6 text-white drop-shadow-2xl justify-center"
                    >
                        Rent a Therapy Room
                    </TextReveal>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        Looking to hire a therapy room in Dorchester? We offer flexible rental options for therapists and practitioners.
                    </p>
                </div>
            </AnimatedSection>

            {/* Gallery Section - Removed due to duplicate images */}

            {/* Options Section */}
            <AnimatedSection className="py-16 px-6">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-4xl font-serif text-center mb-12 text-brand-900">Rental Options</h2>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {options.map((option, index) => (
                            <TiltCard key={`${option.title}-${index}`} delay={index * 0.1}>
                                <AnimatedCard
                                    delay={index * 0.1}
                                    className="bg-white/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brown-100 hover:border-brown-300 h-full"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={option.image}
                                            alt={option.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            quality={85}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="text-4xl mb-4">{option.icon}</div>
                                        <h3 className="text-2xl font-serif mb-4 text-brand-900">{option.title}</h3>
                                        <div 
                                            className="text-brand-700 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: option.description }}
                                        />
                                    </div>
                                </AnimatedCard>
                            </TiltCard>
                        ))}
                    </StaggerContainer>

                    {/* Contact CTA */}
                    <div className="mt-16 text-center bg-brand-100 rounded-2xl p-12">
                        <h2 className="text-3xl font-serif mb-4 text-brand-900">Interested in Hiring Our Space?</h2>
                        <p className="text-brand-700 mb-8 max-w-2xl mx-auto">
                            Contact us to discuss availability, pricing, and how we can accommodate your practice needs.
                            We offer flexible rental options including weekend availability.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <AnimatedButton href="/contact-us" variant="primary" size="lg">
                                Contact Us
                            </AnimatedButton>
                            <AnimatedButton href="/about-us" variant="outline" size="lg">
                                Learn More About The Rooms
                            </AnimatedButton>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}
