import { getCustomPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedButton from '@/components/AnimatedButton';
import Image from 'next/image';
import { getTeamHeadshot } from '@/lib/teamHeadshots';
import ContactDropdown from '@/components/ContactDropdown';
import { formatTeamContent } from '@/lib/formatContent';

export async function generateStaticParams() {
    const team = await getCustomPosts('team');
    return team.map((member: any) => ({
        slug: member.slug,
    }));
}

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
    const team = await getCustomPosts('team');
    const member = team.find((m: any) => m.slug === params.slug);

    if (!member) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
                            {/* Photo Section */}
                            <div className="md:col-span-1">
                                {(() => {
                                    const imageUrl = member.featured_image_url || getTeamHeadshot(member.slug, member.title.rendered);
                                    return imageUrl ? (
                                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
                                            <Image
                                                src={imageUrl}
                                                alt={member.title.rendered}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-square bg-brand-700 rounded-2xl flex items-center justify-center shadow-xl">
                                            <span className="text-6xl text-white font-serif">
                                                {member.title.rendered.split(' ').map((n: string) => n[0]).join('')}
                                            </span>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Info Section */}
                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-white drop-shadow-lg">
                                        {member.title.rendered}
                                    </h1>
                                    {member.meta?.position && (
                                        <p className="text-xl text-white/90 mb-2 drop-shadow-md">{member.meta.position}</p>
                                    )}
                                    {member.meta?.credentials && (
                                        <p className="text-white/80 mb-4 drop-shadow-md">{member.meta.credentials}</p>
                                    )}
                                </div>

                                {/* Contact & Fees Section - Collapsible */}
                                <ContactDropdown
                                    email={member.meta?.email}
                                    phone={member.meta?.phone}
                                    startingPrice={member.meta?.starting_price}
                                />

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {member.meta?.email && (
                                        <a
                                            href={`mailto:${member.meta.email}`}
                                            className="px-6 py-3 bg-white text-brand-800 hover:bg-white/90 rounded-lg font-medium transition-colors shadow-lg"
                                        >
                                            Send Email
                                        </a>
                                    )}
                                    {member.meta?.phone && (
                                        <a
                                            href={`tel:${member.meta.phone}`}
                                            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Call Now
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
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
                                className="prose prose-lg max-w-none prose-headings:text-brand-800 prose-strong:text-brand-800 team-profile-content"
                                dangerouslySetInnerHTML={{ __html: formatTeamContent(member.content.rendered) }}
                            />

                            {/* Specializations */}
                            {member.meta?.specializations && (
                                <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-200">
                                    <h3 className="text-xl font-serif mb-4 text-brand-800">Specializations</h3>
                                    <div className="text-stone-700 text-justify leading-relaxed whitespace-pre-line">{member.meta.specializations}</div>
                                </div>
                            )}

                            {/* Qualifications */}
                            {member.meta?.credentials && (
                                <div className="mt-6 p-6 bg-stone-100 rounded-lg">
                                    <h3 className="text-xl font-serif mb-4 text-brand-800">Qualifications</h3>
                                    <div 
                                        className="team-profile-content text-stone-700"
                                        dangerouslySetInnerHTML={{ __html: formatTeamContent(member.meta.credentials) }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-6 shadow-lg border border-stone-200 sticky top-24">
                                <h3 className="text-xl font-serif mb-6 text-brand-800">Quick Contact</h3>
                                
                                {member.meta?.email && (
                                    <div className="mb-5">
                                        <p className="text-sm text-stone-600 mb-2 font-medium">Email</p>
                                        <a
                                            href={`mailto:${member.meta.email}`}
                                            className="text-brand-600 hover:text-brand-800 break-all transition-colors"
                                        >
                                            {member.meta.email}
                                        </a>
                                    </div>
                                )}
                                
                                {member.meta?.phone && (
                                    <div className="mb-5">
                                        <p className="text-sm text-stone-600 mb-2 font-medium">Phone</p>
                                        <a
                                            href={`tel:${member.meta.phone}`}
                                            className="text-brand-600 hover:text-brand-800 transition-colors"
                                        >
                                            {member.meta.phone}
                                        </a>
                                    </div>
                                )}
                                
                                {member.meta?.starting_price && (
                                    <div className="mb-6 pb-6 border-b border-stone-200">
                                        <p className="text-sm text-stone-600 mb-2 font-medium">Starting Price</p>
                                        <p className="text-brand-700 font-semibold text-lg">{member.meta.starting_price}</p>
                                    </div>
                                )}
                                
                                <AnimatedButton href="/contact-us" variant="primary" size="md" className="w-full">
                                    Book Consultation
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}

