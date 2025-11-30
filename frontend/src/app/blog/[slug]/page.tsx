import { getPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const posts = await getPosts();
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <div className="text-sm text-white mb-4 drop-shadow-md">
                            {new Date(post.date).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            {post.title.rendered}
                        </h1>
                    </div>
                </div>
            </AnimatedSection>

            {/* Content Section */}
            <AnimatedSection className="py-16 px-6">
                <div className="container mx-auto max-w-4xl">
                    <article
                        className="prose prose-lg max-w-none bg-white rounded-lg p-8 shadow-sm"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />

                    <div className="mt-12 pt-8 border-t border-stone-200">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-medical-600 hover:text-medical-800 font-medium"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}

