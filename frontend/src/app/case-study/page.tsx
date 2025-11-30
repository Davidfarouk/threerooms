import { getCustomPosts } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import StaggerContainer from '@/components/StaggerContainer';
import Link from 'next/link';
import Image from 'next/image';

export default async function CaseStudiesPage() {
    const caseStudies = await getCustomPosts('case_study');

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg">
                        Case Studies
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        Real stories of healing and transformation
                    </p>
                </div>
            </AnimatedSection>

            {/* Case Studies Grid */}
            <AnimatedSection className="py-16 px-6">
                <div className="container mx-auto max-w-6xl">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.length > 0 ? (
                            caseStudies.map((study: any, index: number) => (
                                <AnimatedCard
                                    key={study.id}
                                    delay={index * 0.1}
                                    href={`/case-study/${study.slug}`}
                                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
                                >
                                    <h3 className="text-2xl font-serif mb-4 text-stone-800">{study.title.rendered}</h3>
                                    {study.meta?.case_summary && (
                                        <p className="text-stone-600 mb-4">{study.meta.case_summary}</p>
                                    )}
                                    <div
                                        className="text-stone-600 mb-6 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: study.excerpt?.rendered || study.content.rendered }}
                                    />
                                    <div className="inline-flex items-center text-medical-600 font-medium hover:text-medical-800 transition-colors">
                                        Read case study <span className="ml-2">→</span>
                                    </div>
                                </AnimatedCard>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 bg-white rounded-lg border border-dashed border-stone-300">
                                <p className="text-stone-500">No case studies found. Please add some in WordPress.</p>
                            </div>
                        )}
                    </StaggerContainer>
                </div>
            </AnimatedSection>
        </div>
    );
}

