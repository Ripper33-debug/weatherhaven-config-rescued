/*
  Import Weatherhaven page content for Military, Medical, and Commercial pages.
  Writes to src/config/externalContent.json in the shape:
  { pages: { slug: { title: string, sections: [ContentBlock] } } }
*/

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const BASE = 'https://weatherhaven.com';
const SLUGS = ['military', 'medical', 'commercial'];

function toAbsoluteUrl(url) {
  try {
    return new URL(url, BASE).href;
  } catch {
    return url;
  }
}

function extractBlocks(html) {
  const $ = cheerio.load(html);

  // Prefer <main>, fallback to body
  const $root = $('main').length ? $('main') : $('body');

  // Remove nav/footer/common non-content areas
  $root.find('header, nav, footer, script, style, noscript').remove();

  const blocks = [];

  // Collect headings, paragraphs, and notable images in DOM order
  $root.find('h1, h2, h3, p, img').each((_, el) => {
    const tag = el.tagName && el.tagName.toLowerCase();
    const $el = $(el);

    if (tag === 'h1') {
      const text = $el.text().trim();
      if (text) {
        blocks.push({ type: 'heading', level: 2, text });
      }
    }
    if (tag === 'h2' || tag === 'h3') {
      const text = $el.text().trim();
      if (text) {
        const level = tag === 'h2' ? 2 : 3;
        blocks.push({ type: 'heading', level, text });
      }
    }
    if (tag === 'p') {
      const text = $el.text().replace(/\s+/g, ' ').trim();
      if (text && text.length > 40) {
        blocks.push({ type: 'paragraph', text });
      }
    }
    if (tag === 'img') {
      const src = $el.attr('src');
      if (src && !src.startsWith('data:')) {
        blocks.push({ type: 'image', src: toAbsoluteUrl(src), alt: $el.attr('alt') || '' });
      }
    }
  });

  // De-duplicate consecutive images with same src
  const deduped = [];
  const seen = new Set();
  for (const b of blocks) {
    if (b.type === 'image') {
      if (seen.has(b.src)) continue;
      seen.add(b.src);
    }
    deduped.push(b);
  }

  // Cap to a reasonable number
  return deduped.slice(0, 100);
}

async function fetchPage(slug) {
  const url = `${BASE}/${slug}`;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; ImportScript/1.0)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const title = $('h1').first().text().trim() || slug.charAt(0).toUpperCase() + slug.slice(1);
    const sections = extractBlocks(html);
    return { slug, title, sections };
  } catch (err) {
    return {
      slug,
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      sections: [
        { type: 'paragraph', text: `Content import failed (${String(err)}). Please update manually.` },
      ],
    };
  }
}

async function run() {
  const results = {};
  for (const slug of SLUGS) {
    const page = await fetchPage(slug);
    results[slug] = { title: page.title, sections: page.sections };
  }

  const out = { pages: results };
  const outPath = path.resolve(__dirname, '../src/config/externalContent.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`Wrote ${outPath}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


