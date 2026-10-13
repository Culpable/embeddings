/**
 * Apply the owner's selected copy and logo revisions to the original artwork.
 * Reuse the original geometry and brand assets; preserve the earlier candidates.
 */
import { concepts as originals, documentHtml as originalDocument } from './base-artwork.mjs';

export const concepts = originals.filter(concept => ['01-systems-hub', '03-five-capabilities', '05-brand-poster'].includes(concept.id));


export function documentHtml(concept, theme, assets) {
  let html = originalDocument(concept, theme, assets);
  // Replace the footer in all three selected designs with the exact approved wording.
  html = html.replace('AI consulting and implementation · Australia', 'Australian AI consultancy');

  if (concept.id === '01-systems-hub') {
    // Restore the complete header logo, retaining the ribbon in the central node.
    html = html.replace('We design, build and run AI inside your existing software and data.', 'We connect AI to your documents, systems and inbox, then keep it running.');
  }

  if (concept.id === '03-five-capabilities') {
    // Reuse the owner's approved wording instead of the rejected practical-AI headline.
    html = html.replace('Practical AI,<br>built and run.', 'AI built into<br>the way you work');
  }

  if (concept.id === '05-brand-poster') {
    // Remove the duplicate small lockup while retaining the oversized logo and outline.
    html = html.replace(/<div class="brand" data-geometry>.*?<\/div>/, '');
    html = html.replace('Practical AI for<br>Australian businesses', 'AI built into the way you work');
    // Balance the tagline under the entire logo instead of indenting a short text block.
    html = html.replace('</style>', '.tagline{left:64px;top:397px;width:1072px;text-align:center;letter-spacing:-.025em}</style>');
  }

  return html;
}
