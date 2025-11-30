import { getPageBySlug } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import TextReveal from '@/components/TextReveal';
import Image from 'next/image';

export default async function AboutPage() {
    const page = await getPageBySlug('about-us');

    return (
        <div className="min-h-screen bg-brand-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src="/resources/Page - Rent a therapy room_ maybe text in front on photo_.jpg"
                        alt="Therapy room background"
                        fill
                        className="object-cover"
                        style={{ objectPosition: '50% 25%' }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/70 to-brand-900/90 z-0"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <TextReveal
                        className="text-5xl md:text-6xl font-serif font-medium mb-6 text-white drop-shadow-2xl justify-center"
                    >
                        About Us
                    </TextReveal>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        A calm and welcoming therapeutic space in the heart of Poundbury
                    </p>
                </div>
            </AnimatedSection>

            {/* Content Section */}
            <AnimatedSection className="py-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    {page ? (
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                        />
                    ) : (
                        <div className="prose prose-lg max-w-none">
                            <h2>The Rooms Statement</h2>
                            <p>
                                The Rooms was established in 2009 by Judith and Paul Spurr. Judith, a practising psychotherapist,
                                brought the vision of a calm and welcoming therapeutic space to life – a vision you can still feel
                                today when you step through the door.
                            </p>
                            <p>
                                In 2019, their daughter Lucie took over management of The Rooms. Though not a therapist herself,
                                Lucie is proud to continue her mother's legacy and is your point of contact at the clinic. She is
                                always happy to help guide you in the right direction when seeking support.
                            </p>

                            <h2>Royal Visit</h2>
                            <p>
                                Over the years, The Rooms has welcomed a diverse range of visitors and in 2014, we had the honour of
                                a royal visit from King Charles (then Prince Charles, Duke of Cornwall) during his trip to Poundbury.
                                His interest in complementary health made the visit especially meaningful. We're still hoping he'll
                                return one day – this time, as a client!
                            </p>

                            <h2>Your Feedback Matters</h2>
                            <p>
                                We always appreciate hearing from those who have used our clinic. If you've visited The Rooms, please
                                consider leaving us a review on Google – it helps others find the support they need and helps us
                                continue to grow and improve.
                            </p>
                        </div>
                    )}
                </div>
            </AnimatedSection>
        </div>
    );
}
