const CDN_WISATA_URL = 'https://cdn.wisata.app'
const CDN_TWITTER_URL = 'https://pbs.twimg.com'
const CDN_WISATA_IMG_SIZE = {
  TH: 'th',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
}

/**
 * TASK: Find available image size for Twitter CDN
 */
const CDN_TWITTER_IMG_SIZE = {
  TH: 'thumb',
  XS: 'small',
  SM: 'medium',
  MD: 'large',
  LG: 'orig',
}

/**
 * TASK: Replace original image URL with size-optimized image URL.
 * @example
 * For Wisata CDN URL:
 * ```
 * https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_th.jpg
 * - https://cdn.wisata.app/diary/87511695-cafc-401b-8eba-2db648083556_lg.jpg
 * ```
 *
 * Note that some images may not have optimized URL variants.
 */
export function getSizeOptimizedImageUrl(originalUrl, desiredSize) {
  if (!originalUrl || !desiredSize) return originalUrl;

  const wisataSizes = Object.values(CDN_WISATA_IMG_SIZE);
  const twitterSizes = Object.values(CDN_TWITTER_IMG_SIZE);
  const lowerSize = desiredSize.toLowerCase();
  
  if (originalUrl.startsWith(CDN_WISATA_URL)) {
    if (!wisataSizes.includes(lowerSize)) return originalUrl;

    const lastDotIndex = originalUrl.lastIndexOf(".");
    if (lastDotIndex === -1) return originalUrl;

    const base = originalUrl.slice(0, lastDotIndex);
    const extension = originalUrl.slice(lastDotIndex);

    const sizeSuffixRegex = new RegExp(`_(${wisataSizes.join("|")})$`);
    if (sizeSuffixRegex.test(base)) {
      const newBase = base.replace(sizeSuffixRegex, `_${lowerSize}`);
      return `${newBase}${extension}`;
    } else {
      return `${base}_${lowerSize}${extension}`;
    }
  }

  if (originalUrl.startsWith(CDN_TWITTER_URL)) {
    const twitterSize = CDN_TWITTER_IMG_SIZE[lowerSize];
    if (!twitterSizes.includes(twitterSize)) return originalUrl;

    const url = new URL(originalUrl);

    if (url.searchParams.has("name")) {
      url.searchParams.set("name", twitterSize);
    } else {
      url.searchParams.append("name", twitterSize);
    }
    return url.toString();
  }

  return originalUrl;
}

/**
 * TASK: Extracts SEO attributes from diary content
 */
export function getDiaryContentSEOAttributes(contentData) {
  const meta = contentData?.meta || {};

  const slug = Object.entries(meta)
    .filter(([key, value]) => key.toLowerCase().includes('slug') && typeof value === 'string')
    .map(([_, value]) => value);

  return {
    title: meta.title || '',
    description: meta.description || '',
    image: meta.image || '',
    lang: meta.language || 'id-id',
    slug,
  };
}

/**
 * TASK: Convert diary content to renderable data
 * 
 * The content coming from `/cms/diary` is in MDX (Markdown with Embedded Components) format. This function help render that content.
 * 
 * Known MDX components are:
 * - \<YoutubeEmbed />
 * - \<InstagramEmbed />
 * - \<TiktokEmbed />
 * - \<TwitterEmbed />
 */
export function renderDiaryContent(contentData) {
  if (!contentData || typeof contentData !== 'string') {
    return [];
  }

  const renderInlineContent = (text) => {
    if (!text) return '';
    let content = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 underline">$1</a>');
    return content;
  };

  const lines = contentData.split('\n');
  const elements = [];
  let currentParagraph = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('<TiktokEmbed')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      const urlMatch = trimmedLine.match(/url="([^"]+)"/);
      if (urlMatch) {
        elements.push({
          type: 'tiktok',
          url: urlMatch[1],
          key: `tiktok-${elements.length}`
        });
      }
    }
    else if (trimmedLine.startsWith('<YoutubeEmbed')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      const urlMatch = trimmedLine.match(/url="([^"]+)"/);
      if (urlMatch) {
        elements.push({
          type: 'youtube',
          url: urlMatch[1],
          key: `youtube-${elements.length}`
        });
      }
    }
    else if (trimmedLine.startsWith('<InstagramEmbed')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      const urlMatch = trimmedLine.match(/url="([^"]+)"/);
      if (urlMatch) {
        elements.push({
          type: 'instagram',
          url: urlMatch[1],
          key: `instagram-${elements.length}`
        });
      }
    }
    else if (trimmedLine.startsWith('<TwitterEmbed')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      const urlMatch = trimmedLine.match(/url="([^"]+)"/);
      if (urlMatch) {
        elements.push({
          type: 'twitter',
          url: urlMatch[1],
          key: `twitter-${elements.length}`
        });
      }
    }

    else if (trimmedLine.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      elements.push({
        type: 'h3',
        content: trimmedLine.substring(4),
        key: `h3-${elements.length}`
      });
    }
    else if (trimmedLine.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      elements.push({
        type: 'h2',
        content: trimmedLine.substring(3),
        key: `h2-${elements.length}`
      });
    }
    else if (trimmedLine.startsWith('# ')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      elements.push({
        type: 'h1',
        content: trimmedLine.substring(2),
        key: `h1-${elements.length}`
      });
    }

    else if (trimmedLine.startsWith('![')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      const imageMatch = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        elements.push({
          type: 'image',
          src: src,
          alt: alt,
          key: `img-${elements.length}`
        });
      }
    }

    else if (trimmedLine.startsWith('-   ')) {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
      
      elements.push({
        type: 'list',
        content: renderInlineContent(trimmedLine.substring(4)),
        key: `ul-${elements.length}`
      });
    }

    else if (trimmedLine === '') {
      if (currentParagraph.length > 0) {
        elements.push({
          type: 'paragraph',
          content: renderInlineContent(currentParagraph.join(' ')),
          key: `p-${elements.length}`
        });
        currentParagraph = [];
      }
    }

    else {
      currentParagraph.push(line);
    }
  });
  
  if (currentParagraph.length > 0) {
    elements.push({
      type: 'paragraph',
      content: renderInlineContent(currentParagraph.join(' ')),
      key: `p-${elements.length}`
    });
  }
  
  return elements;
}
