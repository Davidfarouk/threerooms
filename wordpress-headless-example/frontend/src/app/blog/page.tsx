import { getPosts } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import StaggerContainer from '@/components/StaggerContainer';
import Link from 'next/link';

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-white drop-shadow-lg">
                        Blog
                    </h1>
                    <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
                        Insights, tips, and updates from The Rooms
                    </p>
                </div>
            </AnimatedSection>

            {/* Blog Posts Grid */}
            <AnimatedSection className="py-16 px-6">
                <div className="container mx-auto max-w-6xl">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.length > 0 ? (
                            posts.map((post: any, index: number) => (
                                <AnimatedCard
                                    key={post.id}
                                    delay={index * 0.1}
                                    href={`/blog/${post.slug}`}
                                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
                                >
                                    <div className="text-sm text-stone-500 mb-3">
                                        {new Date(post.date).toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <h3 className="text-2xl font-serif mb-4 text-stone-800">{post.title.rendered}</h3>
                                    <div
                                        className="text-stone-600 mb-6 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || post.content.rendered }}
                                    />
                                    <div className="inline-flex items-center text-medical-600 font-medium hover:text-medical-800 transition-colors">
                                        Read more <span className="ml-2">→</span>
                                    </div>
                                </AnimatedCard>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 bg-white rounded-lg border border-dashed border-stone-300">
                                <p className="text-stone-500">No blog posts found. Please add some in WordPress.</p>
                            </div>
                        )}
                    </StaggerContainer>
                </div>
            </AnimatedSection>
        </div>
    );
}

