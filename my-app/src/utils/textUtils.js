export function splitPreservingLinks(text) {
  const parts = [];
  const sentences = text.split('.');

  let buffer = '';
  for (let i = 0; i < sentences.length; i++) {
    const trimmed = sentences[i].trim();
    if (trimmed === '') continue;

    buffer += trimmed;

    // Check if it's a URL that shouldn't be split
    if (trimmed.includes('http') && !trimmed.match(/\.\w{2,3}(\/.*)?$/)) {
      buffer += '. ';
      continue;
    }

    parts.push(buffer.trim() + '.');
    buffer = '';
  }

  if (buffer) parts.push(buffer.trim() + '.');

  return parts;
}