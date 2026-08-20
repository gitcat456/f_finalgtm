import { useEffect } from 'react';

const DEFAULT_DOMAIN = 'https://gtmchurch.co.ke';
const DEFAULT_LOGO = 'https://res.cloudinary.com/dyy3aepmu/image/upload/v1785606828/off_logo_dz4tio.png';
const DEFAULT_SITE_NAME = 'Grace and Truth Ministries';

/**
 * Helper to update or create a meta tag in document head
 */
const setMetaTag = (selector, attrName, attrValue, content) => {
  if (!content) return;
  let element = document.head.querySelector(`meta[${selector}="${attrName}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(selector, attrName);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Helper to update or create a link tag in document head
 */
const setLinkTag = (rel, href) => {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

export default function SEO({
  title = 'Grace and Truth Ministries | Pentecostal Church in Nairobi, Kenya',
  description = 'Grace and Truth Ministries (GTM Church) is a Pentecostal church dedicated to worship, prayer, biblical teaching, and community outreach in Mathare, Nairobi and across Kenya.',
  canonical,
  keywords = 'GTM Church, Grace and Truth Ministries, Pentecostal church Nairobi, Mathare church, Christian worship Kenya, Saturday Sabbath service',
  ogType = 'website',
  ogImage = DEFAULT_LOGO,
  noindex = false,
  nofollow = false,
  schema = null,
}) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Base Meta Tags
    setMetaTag('name', 'description', null, description);
    setMetaTag('name', 'keywords', null, keywords);
    setMetaTag('name', 'author', null, DEFAULT_SITE_NAME);

    // 3. Robots
    const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;
    setMetaTag('name', 'robots', null, robotsContent);
    setMetaTag('name', 'googlebot', null, robotsContent);

    // 4. Canonical URL
    const canonicalUrl = canonical || DEFAULT_DOMAIN;
    setLinkTag('canonical', canonicalUrl);

    // 5. Open Graph Tags
    setMetaTag('property', 'og:site_name', null, DEFAULT_SITE_NAME);
    setMetaTag('property', 'og:type', null, ogType);
    setMetaTag('property', 'og:title', null, title);
    setMetaTag('property', 'og:description', null, description);
    setMetaTag('property', 'og:url', null, canonicalUrl);
    setMetaTag('property', 'og:image', null, ogImage);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', null, 'summary_large_image');
    setMetaTag('name', 'twitter:title', null, title);
    setMetaTag('name', 'twitter:description', null, description);
    setMetaTag('name', 'twitter:image', null, ogImage);

    // 7. Schema.org JSON-LD Script
    let scriptElement = document.head.querySelector('#seo-json-ld');
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = 'seo-json-ld';
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Clean up JSON-LD on unmount if needed
      const currentScript = document.head.querySelector('#seo-json-ld');
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, canonical, keywords, ogType, ogImage, noindex, nofollow, schema]);

  return null;
}
