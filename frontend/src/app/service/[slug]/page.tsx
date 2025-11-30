import { getCustomPosts, getPageBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedButton from '@/components/AnimatedButton';
import Link from 'next/link';
import Image from 'next/image';
import { getTeamHeadshot } from '@/lib/teamHeadshots';

export async function generateStaticParams() {
    const services = await getCustomPosts('service');
    return services.map((service: any) => ({
        slug: service.slug,
    }));
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
    const services = await getCustomPosts('service');
    const service = services.find((s: any) => s.slug === params.slug);

    if (!service) {
        notFound();
    }

    // Get team members who offer this service
    const allTeam = await getCustomPosts('team');
    const relatedTeam = allTeam.filter((member: any) => {
        // Check if this therapist offers this service
        const servicesOffered = member.meta?.services_offered;
        if (!servicesOffered) {
            return false;
        }
        
        // Handle different data formats (array, single value, or comma-separated string)
        let serviceIds: number[] = [];
        if (Array.isArray(servicesOffered)) {
            serviceIds = servicesOffered.map((id: any) => parseInt(id)).filter((id: number) => !isNaN(id));
        } else if (typeof servicesOffered === 'string') {
            // Handle comma-separated string
            serviceIds = servicesOffered.split(',').map((id: string) => parseInt(id.trim())).filter((id: number) => !isNaN(id));
        } else {
            // Single value
            const id = parseInt(servicesOffered);
            if (!isNaN(id)) {
                serviceIds = [id];
            }
        }
        
        // Check if the current service ID is in the therapist's services_offered
        return serviceIds.includes(service.id);
    });

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg">
                            {service.title.rendered}
                        </h1>
                        {service.meta?.service_tagline && (
                            <p className="text-xl text-white drop-shadow-md">
                                {service.meta.service_tagline}
                            </p>
                        )}
                    </div>
                </div>
            </AnimatedSection>

            {/* Content Section */}
            <AnimatedSection className="py-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: service.content.rendered }}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 sticky top-24">
                                <h3 className="text-xl font-serif mb-4">Book an Appointment</h3>
                                <p className="text-stone-600 mb-6 text-sm">
                                    To book an appointment, please contact the Practitioner directly using the details 
                                    found on Our Team page.
                                </p>
                                <AnimatedButton href="/meet-the-team" variant="primary" size="md" className="w-full">
                                    View Our Team
                                </AnimatedButton>
                                <div className="mt-6 pt-6 border-t border-stone-200">
                                    <h4 className="font-semibold mb-2">Related Services</h4>
                                    <ul className="space-y-2 text-sm">
                                        {services.slice(0, 3).map((s: any) => (
                                            s.id !== service.id && (
                                                <li key={s.id}>
                                                    <Link href={`/service/${s.slug}`} className="text-brand-600 hover:text-brand-800 transition-colors">
                                                        {s.title.rendered}
                                                    </Link>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Practitioners Section */}
            {relatedTeam.length > 0 && (
                <AnimatedSection className="py-16 px-6 bg-white border-t border-stone-200">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-800">Practitioners for this Service</h2>
                            <p className="text-stone-600 max-w-2xl mx-auto">
                                Click on any practitioner below to view their full profile, contact information, and book an appointment.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedTeam.map((member: any, index: number) => {
                                const headshotPath = getTeamHeadshot(member.slug, member.title.rendered);
                                const initials = member.title.rendered.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
                                
                                return (
                                    <Link
                                        key={member.id}
                                        href={`/team/${member.slug}`}
                                        className="group bg-white rounded-lg p-6 border-2 border-stone-200 hover:border-brand-600 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex items-start space-x-4 mb-4">
                                            <div className="flex-shrink-0">
                                                {headshotPath ? (
                                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-stone-200 group-hover:border-brand-600 transition-colors">
                                                        <Image
                                                            src={headshotPath}
                                                            alt={member.title.rendered}
                                                            width={64}
                                                            height={64}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-serif text-xl group-hover:bg-brand-200 transition-colors">
                                                        {initials}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-serif mb-1 text-brand-800 group-hover:text-brand-600 transition-colors">
                                                    {member.title.rendered}
                                                </h3>
                                                {member.meta?.position && (
                                                    <p className="text-brand-600 text-sm font-medium">{member.meta.position}</p>
                                                )}
                                            </div>
                                        </div>
                                        {member.excerpt?.rendered || member.content.rendered ? (
                                            <div 
                                                className="text-stone-600 text-sm line-clamp-3 prose prose-sm max-w-none mb-4"
                                                dangerouslySetInnerHTML={{ __html: (member.excerpt?.rendered || member.content.rendered).substring(0, 200) + '...' }}
                                            />
                                        ) : null}
                                        <div className="flex items-center text-brand-600 text-sm font-medium group-hover:text-brand-800 transition-colors">
                                            <span>View Profile</span>
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </AnimatedSection>
            )}
        </div>
    );
}

