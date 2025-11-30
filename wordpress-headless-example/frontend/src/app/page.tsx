import ClientHome from './ClientHome';
import { getHomepageSettings, getAccreditationLogos } from '@/lib/wordpress';

export default async function Home() {
    // Fetch dynamic homepage content
    const homepageSettings = await getHomepageSettings();
    const accreditationLogos = await getAccreditationLogos();
    
    // Homepage only shows Hero + CTA (no services/team sections)
    return (
        <ClientHome 
            homepageSettings={homepageSettings}
            accreditationLogos={accreditationLogos}
        />
    );
}
