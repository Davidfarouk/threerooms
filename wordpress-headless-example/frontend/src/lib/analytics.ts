// Google Analytics 4 Utility Functions
// This file provides helper functions for tracking events in GA4

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

// Track page views
export const pageview = (url: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID as string, {
            page_path: url,
        });
    }
};

// Track custom events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Common event trackers
export const trackButtonClick = (buttonName: string) => {
    event({
        action: 'click',
        category: 'Button',
        label: buttonName,
    });
};

export const trackFormSubmit = (formName: string) => {
    event({
        action: 'submit',
        category: 'Form',
        label: formName,
    });
};

export const trackServiceView = (serviceName: string) => {
    event({
        action: 'view',
        category: 'Service',
        label: serviceName,
    });
};

export const trackTeamMemberView = (memberName: string) => {
    event({
        action: 'view',
        category: 'Team Member',
        label: memberName,
    });
};

export const trackPhoneClick = () => {
    event({
        action: 'click',
        category: 'Contact',
        label: 'Phone Number',
    });
};

export const trackEmailClick = () => {
    event({
        action: 'click',
        category: 'Contact',
        label: 'Email',
    });
};
