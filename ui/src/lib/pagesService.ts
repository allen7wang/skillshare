/** Keep the remote API origin separate from the client router prefix. */
export function getPagesService(): string {
  const base = (window as Window & { __PAGES_BASE__?: string }).__PAGES_BASE__;
  if (!base) return '';
  try {
    const value = localStorage.getItem(`pages-service:${base}/`);
    if (!value) return '';
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash ? url.href.replace(/\/$/, '') : '';
  } catch { return ''; }
}
