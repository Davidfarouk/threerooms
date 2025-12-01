import { getPageBySlug } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedButton from '@/components/AnimatedButton';
import TextReveal from '@/components/TextReveal';
import Image from 'next/image';

export default async function ContactPage() {
    const page = await getPageBySlug('contact-us');

    return (
        <div className="min-h-screen bg-brand-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-gradient-to-br from-brand-800 to-brand-900 text-white pt-28 md:pt-32 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <TextReveal
                        className="text-5xl md:text-6xl font-serif font-medium mb-6 text-white drop-shadow-2xl justify-center"
                    >
                        Contact Us
                    </TextReveal>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        Book a therapy session today
                    </p>
                </div>
            </AnimatedSection>

            {/* Content Section */}
            <AnimatedSection className="py-20 px-6 bg-brand-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Get in Touch & Contact Form */}
                        <div className="flex flex-col">
                            {/* Get in Touch */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-serif mb-6 text-brand-900">Get in Touch</h2>
                                {page ? (
                                    <div
                                        className="prose prose-lg max-w-none mb-8"
                                        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                                    />
                                ) : (
                                    <div className="prose prose-lg max-w-none mb-8">
                                        <p>
                                            To book an appointment, please contact the Practitioner directly using the contact
                                            details found on Our Team page. To enquire about working with us and for more
                                            information about The Rooms please Email us or fill out the enquiry form.
                                        </p>

                                        <h3 className="text-brand-800">Location</h3>
                                        <p>
                                            <strong>The Rooms Poundbury</strong><br />
                                            1 Ringhill St, Poundbury<br />
                                            Dorchester DT1 3TL<br />
                                            United Kingdom
                                        </p>

                                        <h3 className="text-brand-800">Business Hours</h3>
                                        <p>
                                            Monday – Friday: 9am – 6pm<br />
                                            Saturday & Sunday: CLOSED
                                        </p>
                                    </div>
                                )}

                                <AnimatedButton href="/meet-the-team" variant="primary" size="lg" className="mt-6">
                                    View Our Team
                                </AnimatedButton>
                            </div>

                            {/* Send us a Message */}
                            <div className="bg-white/90 rounded-lg p-6 shadow-sm border border-brown-100">
                                <h3 className="text-2xl font-serif mb-4 text-brand-900">Send us a Message</h3>
                                <form className="space-y-3">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-brand-800 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-brand-800 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-brand-800 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                                            placeholder="e.g., 01305 123456"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-brand-800 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            className="w-full px-4 py-2 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500"
                                            required
                                        />
                                    </div>
                                    <AnimatedButton
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Send Message
                                    </AnimatedButton>
                                </form>
                            </div>
                        </div>

                        {/* Right Side - Image & Map */}
                        <div className="flex flex-col">
                            {/* Image Section - Sized to match "Get in Touch" height */}
                            <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
                                <Image
                                    src="/resources/Page Contact Us_ The Pavillion Poundbury.jpg"
                                    alt="The Pavillion Poundbury"
                                    width={800}
                                    height={800}
                                    className="w-full h-[650px] object-cover"
                                />
                            </div>

                            {/* Map Section */}
                            <div className="bg-white/90 rounded-lg p-6 shadow-sm border border-brown-100">
                                <h3 className="text-2xl font-serif mb-4 text-brand-900">Find Us</h3>
                                <div className="rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.5!2d-2.4414!3d50.7150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4873a1b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2s1%20Ringhill%20St%2C%20Poundbury%2C%20Dorchester%20DT1%203TL%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="The Rooms Poundbury Location"
                                        className="w-full"
                                    />
                                </div>
                                <p className="mt-4 text-brand-700 text-sm">
                                    <strong>The Rooms Poundbury</strong><br />
                                    1 Ringhill St, Poundbury<br />
                                    Dorchester DT1 3TL<br />
                                    United Kingdom
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}
