import { getCustomPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';

export async function generateStaticParams() {
    const studies = await getCustomPosts('case_study');
    return studies.map((study: any) => ({
        slug: study.slug,
    }));
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
    const studies = await getCustomPosts('case_study');
    const study = studies.find((s: any) => s.slug === params.slug);

    if (!study) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg">
                            {study.title.rendered}
                        </h1>
                        {study.meta?.case_summary && (
                            <p className="text-xl text-white drop-shadow-md">
                                {study.meta.case_summary}
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
                                dangerouslySetInnerHTML={{ __html: study.content.rendered }}
                            />

                            {/* Customer Review */}
                            {study.meta?.customer_review && (
                                <div className="mt-8 p-6 bg-medical-50 rounded-lg border-l-4 border-medical-600">
                                    <h3 className="text-xl font-serif mb-4">Customer Review</h3>
                                    <p className="text-stone-700 italic">"{study.meta.customer_review}"</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 sticky top-24">
                                <h3 className="text-xl font-serif mb-4">Case Details</h3>
                                {study.meta?.symptoms && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold mb-2">Symptoms</h4>
                                        <p className="text-sm text-stone-600">{study.meta.symptoms}</p>
                                    </div>
                                )}
                                {study.meta?.therapies_used && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold mb-2">Therapies Used</h4>
                                        <p className="text-sm text-stone-600">{study.meta.therapies_used}</p>
                                    </div>
                                )}
                                {study.meta?.results && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold mb-2">Results</h4>
                                        <p className="text-sm text-stone-600">{study.meta.results}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}

