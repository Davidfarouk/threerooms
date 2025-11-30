'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactDropdownProps {
    email?: string;
    phone?: string;
    startingPrice?: string;
}

export default function ContactDropdown({ email, phone, startingPrice }: ContactDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
                <h3 className="text-lg font-semibold text-white">Contact & Fees</h3>
                <motion.svg
                    className="w-5 h-5 text-white flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 space-y-4">
                            {email && (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <a
                                        href={`mailto:${email}`}
                                        className="text-white hover:text-white/80 transition-colors break-all"
                                    >
                                        {email}
                                    </a>
                                </div>
                            )}
                            
                            {phone && (
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <a
                                        href={`tel:${phone}`}
                                        className="text-white hover:text-white/80 transition-colors"
                                    >
                                        {phone}
                                    </a>
                                </div>
                            )}
                            
                            {startingPrice && (
                                <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                                    <svg className="w-5 h-5 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-white/80">Starting Price</p>
                                        <p className="text-xl font-semibold text-white">{startingPrice}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

