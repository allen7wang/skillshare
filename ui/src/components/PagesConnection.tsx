import { useState, type ReactNode } from 'react';
import { useT } from '../i18n';
import { BASE_PATH } from '../lib/basePath';
import Button from './Button';
import { Input } from './Input';
import DialogShell from './DialogShell';

export default function PagesConnection({ children }: { children: ReactNode }) {
  const t = useT();
  const pages = Boolean((window as Window & { __PAGES_BASE__?: string }).__PAGES_BASE__);
  const key = `pages-service:${BASE_PATH}/`;
  const [initial] = useState(() => { try { return pages ? localStorage.getItem(key) || '' : ''; } catch { return ''; } });
  const [editing, setEditing] = useState(!initial);
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(false);
  if (!pages) return children;
  const panel = <main className="ss-wrap animate-fade-in max-w-xl mx-auto py-12">
    <h1 className="text-2xl font-semibold">{t('pages.title')}</h1>
    <p className="ss-note my-4">{t('pages.description')}</p>
    <form onSubmit={event => {
      event.preventDefault();
      try {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw Error();
        localStorage.setItem(key, url.href.replace(/\/$/, ''));
        location.reload();
      } catch { setError(true); }
    }}>
      <label className="block mb-2" htmlFor="pages-service-url">{t('pages.address')}</label>
      <Input id="pages-service-url" className="w-full" type="url" required value={value} onChange={event => setValue(event.target.value)} />
      {error && <p role="alert" className="ss-note bad">{t('pages.invalid')}</p>}
      <p className="ss-note my-4">{t('pages.localOnly')}</p>
      <div className="flex gap-3"><Button type="submit">{t('pages.connect')}</Button>{initial && <Button variant="secondary" onClick={() => setEditing(false)}>{t('common.cancel')}</Button>}</div>
    </form>
  </main>;
  return <>
    {initial ? children : null}
    {initial && <Button className="fixed bottom-4 right-4 z-50" onClick={() => setEditing(true)}>{t('pages.settings')}</Button>}
    {initial ? <DialogShell open={editing} onClose={() => setEditing(false)} ariaLabel={t('pages.title')}>{panel}</DialogShell> : panel}
  </>;
}
