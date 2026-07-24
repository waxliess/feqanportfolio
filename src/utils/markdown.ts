// Basit ve bağımlılıksız bir Markdown -> HTML dönüştürücü.
// README içerikleri sadece görüntülendiği için tam bir markdown motoruna
// gerek yok; en yaygın kullanılan söz dizimini karşılar ve HTML'i
// önceden escape ederek XSS riskini engeller.

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function parseMarkdown(markdown: string): string {
  let html = escapeHtml(markdown);

  // Kod blokları (satır içi kod ile karışmaması için önce işlenir)
  html = html.replace(/```[\w]*\n([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

  // Başlıklar
  html = html
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Kalın / italik
  html = html
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/__(.*?)__/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/(?<![\w])_(.+?)_(?![\w])/gim, '<em>$1</em>');

  // Görseller ve linkler (görsel, link kuralından önce işlenmeli)
  html = html.replace(/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/gim, '<img src="$2" alt="$1" loading="lazy" />');
  html = html.replace(/\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Alıntılar
  html = html.replace(/^&gt; ?(.*$)/gim, '<blockquote>$1</blockquote>');

  // Listeler
  html = html.replace(/^[-*] (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/gim, (match) => `<ul>${match}</ul>`);

  // Yatay çizgi
  html = html.replace(/^---+$/gim, '<hr />');

  // Paragraflar
  const blocks = html.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h\d|ul|pre|blockquote|hr|img)/i.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return blocks.join('\n');
}
