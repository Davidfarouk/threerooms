'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about-us' },
        { label: 'Services', href: '/therapies' },
        { label: 'Team', href: '/meet-the-team' },
        { label: 'Rent Room', href: '/hire-therapy-room-dorchester' },
        { label: 'Contact', href: '/contact-us' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-800/50 transition-shadow duration-300">
            <nav className="container mx-auto px-6 py-5 md:py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <div className="bg-white rounded-lg px-4 py-2.5 shadow-xl border border-gray-200/50 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                            <Image
                                src="/resources/Logos/Header.png"
                                alt="The Rooms Poundbury Complementary Health Clinic"
                                width={300}
                                height={80}
                                className="h-12 md:h-14 lg:h-16 w-auto object-contain max-w-[260px] md:max-w-[300px]"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative text-base md:text-lg text-gray-200 hover:text-white transition-all duration-300 font-medium group ${
                                        isActive ? 'text-white' : ''
                                    }`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-200"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Backdrop */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            style={{ top: '112px' }}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 relative z-50 bg-gray-900"
                        >
                            <div className="flex flex-col space-y-5">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`text-lg transition-all duration-300 font-medium py-3 hover:translate-x-1 ${
                                                isActive 
                                                    ? 'text-orange-500 font-semibold border-l-4 border-orange-500 pl-4' 
                                                    : 'text-gray-200 hover:text-white'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}

