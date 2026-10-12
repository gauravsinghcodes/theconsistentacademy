import { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title 
      ? `${title} | The Consistent Academy` 
      : 'The Consistent Academy | Expert English & IELTS Preparation';
    
    document.title = fullTitle;

    const defaultDesc = "Master IELTS, corporate communication, and spoken English with British Council certified trainer Vidya Wankhade at The Consistent Academy in Pune, Maharashtra.";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || defaultDesc);
    }

    // Ensure Geolocation meta tags for local SEO
    const setMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('geo.region', 'IN-MH');
    setMetaTag('geo.placename', 'Pune');
    setMetaTag('geo.position', '18.5246;73.8567');
    setMetaTag('ICBM', '18.5246, 73.8567');

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description]);

  return null;
}
