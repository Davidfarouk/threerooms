import { getCustomPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedButton from '@/components/AnimatedButton';
import Link from 'next/link';
import Image from 'next/image';
import { getTeamHeadshot } from '@/lib/teamHeadshots';
import ContactDropdown from '@/components/ContactDropdown';
import { formatTeamContent } from '@/lib/formatContent';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const team = await getCustomPosts('team');
    return team.map((member: any) => ({
        slug: member.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const allTeam = await getCustomPosts('team');
    const member = allTeam.find((t: any) => t.slug === params.slug);
    
    if (!member) {
        return { title: 'Team Member Not Found' };
    }

    const name = member.title.rendered;
    const position = member.meta?.position || 'Therapist';
    const therapyType = member.meta?.type_of_therapy || 'wellness';
    const description = `${position} specializing in ${therapyType} in Poundbury, Dorchester. ${member.meta?.specializations || 'Find qualified therapeutic services at The Rooms Poundbury.'}`;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theroomspoundbury.co.uk';
    const headshotUrl = getTeamHeadshot(member.slug, name);

    return {
        title: `${name} | Therapist at The Rooms Poundbury`,
        description: description,
        keywords: [
            name,
            `${name} Poundbury`,
            `${therapyType} Poundbury`,
            `${therapyType} Dorchester`,
            'therapist Poundbury',
            position.toLowerCase(),
        ],
        openGraph: {
            title: `${name} | ${position} at The Rooms Poundbury`,
            description: description,
            url: `${baseUrl}/team/${params.slug}`,
            type: 'profile',
            images: headshotUrl ? [
                {
                    url: headshotUrl,
                    width: 1200,
                    height: 1200,
                    alt: name,
                }
            ] : undefined,
        },
        alternates: {
            canonical: `${baseUrl}/team/${params.slug}`,
        },
    };
}

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
    const team = await getCustomPosts('team');
    const member = team.find((m: any) => m.slug === params.slug);

    if (!member) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Breadcrumbs */}
            <AnimatedSection className="pt-28 md:pt-32 pb-4 px-6 bg-stone-50">
                <div className="container mx-auto max-w-4xl">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-brand-600 hover:text-orange-500 transition-colors">
                            Home
                        </Link>
                        <span className="text-brand-400">/</span>
                        <Link href="/meet-the-team" className="text-brand-600 hover:text-orange-500 transition-colors">
                            Team
                        </Link>
                        <span className="text-brand-400">/</span>
                        <span className="text-brand-800">{member.title.rendered}</span>
                    </nav>
                </div>
            </AnimatedSection>

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
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                priority
                                                quality={90}
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
            <AnimatedSection className="py-20 px-6 bg-brand-50">
                <div className="container mx-auto max-w-4xl">
                    {/* Main Content - Full Width */}
                    <div>
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

                        {/* Type of Therapy */}
                        {member.meta?.type_of_therapy && (
                            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-200">
                                <h3 className="text-xl font-serif mb-4 text-brand-800">Type of Therapy</h3>
                                <ul className="space-y-2 text-stone-700">
                                    {member.meta.type_of_therapy.split('\n').filter((line: string) => line.trim() !== '').map((therapy: string, idx: number) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-brand-600 mr-2">•</span>
                                            <span>{therapy.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Qualifications & Certificates */}
                        {member.meta?.qualifications_list && (
                            <div className="mt-6 p-6 bg-stone-100 rounded-lg">
                                <h3 className="text-xl font-serif mb-4 text-brand-800">Qualifications & Certificates</h3>
                                <ul className="space-y-2 text-stone-700">
                                    {member.meta.qualifications_list.split('\n').filter((line: string) => line.trim() !== '').map((qual: string, idx: number) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-brand-600 mr-2">•</span>
                                            <span>{qual.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Credentials (short) */}
                        {member.meta?.credentials && (
                            <div className="mt-6 p-6 bg-stone-100 rounded-lg">
                                <h3 className="text-xl font-serif mb-4 text-brand-800">Credentials</h3>
                                <div
                                    className="team-profile-content text-stone-700"
                                    dangerouslySetInnerHTML={{ __html: formatTeamContent(member.meta.credentials) }}
                                />
                            </div>
                        )}

                        {/* Registrations */}
                        {member.meta?.registrations && (
                            <div className="mt-6 p-6 bg-white rounded-lg border border-stone-200">
                                <h3 className="text-xl font-serif mb-4 text-brand-800">Professional Registrations</h3>
                                <ul className="space-y-2 text-stone-700">
                                    {member.meta.registrations.split('\n').filter((line: string) => line.trim() !== '').map((reg: string, idx: number) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-brand-600 mr-2">•</span>
                                            <span>{reg.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Fees Structure */}
                        {member.meta?.fees_structure && (
                            <div className="mt-6 p-6 bg-brand-50 rounded-lg border border-brand-200">
                                <h3 className="text-xl font-serif mb-4 text-brand-800">Fees</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-stone-700">
                                        <thead>
                                            <tr className="border-b border-brand-300">
                                                <th className="text-left py-2 px-4 font-semibold">Session</th>
                                                <th className="text-left py-2 px-4 font-semibold">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {member.meta.fees_structure.split('\n').filter((line: string) => line.trim() !== '' && line.includes('|')).map((fee_line: string, idx: number) => {
                                                const parts = fee_line.split('|').map(p => p.trim());
                                                if (parts.length >= 2) {
                                                    return (
                                                        <tr key={idx} className="border-b border-stone-200">
                                                            <td className="py-2 px-4">{parts[0]}</td>
                                                            <td className="py-2 px-4 font-medium text-brand-700">{parts[1]}</td>
                                                        </tr>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Website Link - if available */}
                        {member.meta?.website && (
                            <div className="mt-8 p-6 bg-white rounded-lg border border-stone-200">
                                <h3 className="text-xl font-serif mb-4 text-brand-800">Website</h3>
                                <a
                                    href={member.meta.website.startsWith('http') ? member.meta.website : `https://${member.meta.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-500 hover:text-orange-600 break-all transition-colors inline-flex items-center gap-2"
                                >
                                    {member.meta.website.replace(/^https?:\/\//, '')}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </AnimatedSection>

            {/* Person Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": member.title.rendered,
                        "jobTitle": member.meta?.position || "Therapist",
                        "worksFor": {
                            "@type": "LocalBusiness",
                            "name": "The Rooms Poundbury",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Poundbury",
                                "addressRegion": "Dorset",
                                "addressCountry": "GB"
                            }
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Poundbury",
                            "addressRegion": "Dorset",
                            "addressCountry": "GB"
                        },
                        "email": member.meta?.email || undefined,
                        "telephone": member.meta?.phone || undefined,
                        "description": member.meta?.specializations || `${member.meta?.type_of_therapy || 'Therapeutic'} services in Poundbury, Dorchester.`,
                        "image": getTeamHeadshot(member.slug, member.title.rendered) || undefined,
                        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theroomspoundbury.co.uk'}/team/${params.slug}`
                    })
                }}
            />
        </div>
    );
}

