import { SITE_METADATA } from '~/data/site-metadata'

export const dynamic = 'force-static'

const DISALLOW = [
  '/api/*',
  '/test/*',
  '/_next/*',
  '/_vercel/*',
  '/.well-known/*',
  '/admin/*',
  '/private/*',
  '*.json$',
]

// Content Signals (https://contentsignals.org/): declares how automated
// systems may use this site's content. Zhang's choice (2026-11-09):
// ai-train=no, search=yes, ai-input=no.
const CONTENT_SIGNALS_PREAMBLE = `# As a condition of accessing this website, you agree to
# abide by the following content signals:
#
# (a)  If a content-signal = yes, you may collect content
# for the corresponding use.
#
# (b)  If a content-signal = no, you may not collect content
# for the corresponding use.
#
# (c)  If the website operator does not include a content
# signal for a corresponding use, the website operator
# neither grants nor restricts permission via content signal
# with respect to the corresponding use.
#
# The content signals and their meanings are:
#
# search: building a search index and providing search
# results (e.g., returning hyperlinks and short excerpts
# from your website's contents).  Search does not include
# providing AI-generated search summaries.
#
# ai-input: inputting content into one or more AI models
# (e.g., retrieval augmented generation, grounding, or other
# real-time taking of content for generative AI search
# answers).
#
# ai-train: training or fine-tuning AI models.
#
# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS
# RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN
# UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS
# IN THE DIGITAL SINGLE MARKET.`

export function GET() {
  const body = [
    CONTENT_SIGNALS_PREAMBLE,
    '',
    'User-Agent: *',
    'Content-Signal: ai-train=no, search=yes, ai-input=no',
    'Allow: /',
    ...DISALLOW.map((path) => `Disallow: ${path}`),
    '',
    `Host: ${SITE_METADATA.siteUrl}`,
    `Sitemap: ${SITE_METADATA.siteUrl}/sitemap.xml`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
