// Utility functions for text processing

/**
 * Strip HTML tags from text content
 * @param html - HTML string to clean
 * @returns Plain text without HTML tags
 */
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags using regex
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing whitespace
}

/**
 * Truncate text to a specific length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add when truncating (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, length: number, suffix: string = '...'): string {
  if (!text || text.length <= length) return text;
  
  return text.substring(0, length).trim() + suffix;
}

/**
 * Extract plain text from blog content and create a clean excerpt
 * @param content - Blog content (may contain HTML)
 * @param maxLength - Maximum length for excerpt
 * @returns Clean excerpt
 */
export function createCleanExcerpt(content: string, maxLength: number = 150): string {
  const plainText = stripHtmlTags(content);
  return truncateText(plainText, maxLength);
}