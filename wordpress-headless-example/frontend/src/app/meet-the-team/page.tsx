import { getCustomPosts } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import StaggerContainer from '@/components/StaggerContainer';
import Link from 'next/link';
import Image from 'next/image';
import { getTeamHeadshot } from '@/lib/teamHeadshots';
import { Suspense } from 'react';
import SkeletonCard from '@/components/SkeletonCard';

export default async function MeetTheTeamPage() {
    const teamMembers = await getCustomPosts('team');

    return (
        <div className="min-h-screen bg-brand-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-gradient-to-br from-brand-800 to-brand-900 text-white pt-28 md:pt-32 pb-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6 text-white drop-shadow-2xl">
                        Meet The Team
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        Highly qualified professionals dedicated to your wellbeing
                    </p>
                </div>
            </AnimatedSection>

            {/* Team Grid */}
            <AnimatedSection className="py-20 px-6 bg-brand-50">
                <div className="container mx-auto max-w-6xl">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {teamMembers.length > 0 ? (
                            teamMembers.map((member: any, index: number) => (
                                <AnimatedCard
                                    key={member.id}
                                    delay={index * 0.1}
                                    href={`/team/${member.slug}`}
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="aspect-[3/4] bg-brown-100 relative overflow-hidden">
                                        {(() => {
                                            const imageUrl = member.featured_image_url || getTeamHeadshot(member.slug, member.title.rendered);
                                            return imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={member.title.rendered}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                    priority={index < 8}
                                                    quality={85}
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    loading={index < 8 ? 'eager' : 'lazy'}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-brown-200 to-brown-300 flex items-center justify-center">
                                                    <span className="text-4xl text-brown-700 font-serif">
                                                        {member.title.rendered.split(' ').map((n: string) => n[0]).join('')}
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-white text-xl font-serif font-medium mb-1">
                                                {member.title.rendered}
                                            </h3>
                                            <p className="text-white text-sm font-medium uppercase tracking-wider drop-shadow-md">
                                                {member.meta?.position || 'Therapist'}
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-10 bg-white rounded-lg border border-dashed border-stone-300">
                                <p className="text-stone-500">No team members found. Please add some in WordPress.</p>
                            </div>
                        )}
                    </StaggerContainer>
                </div>
            </AnimatedSection>
        </div>
    );
}

