// Mapping team member names to their headshot files
export const teamHeadshotMap: Record<string, string> = {
    'dr-linda-bolton': '/resources/Therapist Headshots/Linda.jpg',
    'linda-bolton': '/resources/Therapist Headshots/Linda.jpg',
    'dr-sharon-winward': '/resources/Therapist Headshots/Sharon Winward.jpg',
    'sharon-winward': '/resources/Therapist Headshots/Sharon Winward.jpg',
    'hilary-charman': '/resources/Therapist Headshots/Hilary Charman.JPG',
    'richard-cawte': '/resources/Therapist Headshots/Richard 1.JPG',
    'chris-piercy': '/resources/Therapist Headshots/Chris.jpg',
    'naomi-david': '/resources/Therapist Headshots/Naomi David Psychotherapist.jpg',
    'michael-sinclair': '/resources/Therapist Headshots/Michael.JPG',
    'sharon-sheppard': '/resources/Therapist Headshots/Sharon Sheppard.png',
    'antoinette-keogh': '/resources/Therapist Headshots/Antoinette Keogh.png',
    'marcel-wadman': '/resources/Therapist Headshots/Marcel 1.jpg',
    'chrissy-fraser': '/resources/Therapist Headshots/Chrissy Fraser.1.jpeg',
    'roberta-winmill': '/resources/Therapist Headshots/Linda 2.jpg', // Placeholder - need actual file
    'dr-carole-deighton': '/resources/Therapist Headshots/Dr Carole Deighton.jpg',
};

export function getTeamHeadshot(slug: string, name?: string): string | null {
    // Try slug first
    if (teamHeadshotMap[slug]) {
        return teamHeadshotMap[slug];
    }
    
    // Try lowercase name
    if (name) {
        const nameKey = name.toLowerCase().replace(/\s+/g, '-');
        if (teamHeadshotMap[nameKey]) {
            return teamHeadshotMap[nameKey];
        }
    }
    
    return null;
}

