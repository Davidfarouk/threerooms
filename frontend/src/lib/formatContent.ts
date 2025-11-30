/**
 * Formats WordPress content by converting dash-separated lists into proper HTML lists
 */
export function formatTeamContent(html: string): string {
    if (!html) return '';
    
    // First, handle content that's already in HTML tags
    let formatted = html;
    
    // Find text nodes or paragraphs that contain dash-separated lists
    // Pattern: lines starting with – or - followed by space
    const dashListPattern = /(?:<p[^>]*>|^)((?:(?:[–-]\s[^\n<]+(?:\n|$))+)+)(?:<\/p>|$)/gm;
    
    formatted = formatted.replace(dashListPattern, (match, listContent) => {
        // Split by newlines and process each line
        const lines = listContent.split('\n').filter((line: string) => line.trim());
        
        // Check if any line starts with dash
        const hasDashLines = lines.some((line: string) => /^[–-]\s/.test(line.trim()));
        
        if (hasDashLines) {
            let listHtml = '<ul class="team-bullet-list">';
            lines.forEach((line: string) => {
                const trimmed = line.trim();
                if (/^[–-]\s/.test(trimmed)) {
                    const cleanLine = trimmed.replace(/^[–-]\s*/, '').trim();
                    if (cleanLine) {
                        listHtml += `<li class="team-bullet-item">${cleanLine}</li>`;
                    }
                }
            });
            listHtml += '</ul>';
            return listHtml;
        }
        
        return match;
    });
    
    // Also handle plain text blocks (not in HTML tags) with dash lists
    const plainTextPattern = /((?:^|\n)(?:[–-]\s[^\n]+(?:\n|$))+)/gm;
    formatted = formatted.replace(plainTextPattern, (match) => {
        const lines = match.split('\n').filter((line: string) => line.trim());
        const hasDashLines = lines.some((line: string) => /^[–-]\s/.test(line.trim()));
        
        if (hasDashLines) {
            let listHtml = '<ul class="team-bullet-list">';
            lines.forEach((line: string) => {
                const trimmed = line.trim();
                if (/^[–-]\s/.test(trimmed)) {
                    const cleanLine = trimmed.replace(/^[–-]\s*/, '').trim();
                    if (cleanLine) {
                        listHtml += `<li class="team-bullet-item">${cleanLine}</li>`;
                    }
                }
            });
            listHtml += '</ul>';
            return listHtml;
        }
        
        return match;
    });
    
    return formatted;
}

