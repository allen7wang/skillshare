import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
vi.mock('../i18n', () => ({ useT: () => (key: string) => key }));
vi.mock('../lib/basePath', () => ({ BASE_PATH: '/skillshare-web' }));
import PagesConnection from './PagesConnection';
function Editor() { const [draft, setDraft] = useState(''); return <input aria-label="draft" value={draft} onChange={e => setDraft(e.target.value)} />; }
describe('Pages connection settings preserve unsaved editor data', () => {
  beforeEach(() => {
    (window as Window & { __PAGES_BASE__?: string }).__PAGES_BASE__ = '/skillshare-web';
    localStorage.setItem('pages-service:/skillshare-web/', 'https://service.example.com');
  });
  it('keeps the existing editor mounted when settings are opened and cancelled', () => {
    render(<PagesConnection><Editor /></PagesConnection>);
    fireEvent.change(screen.getByLabelText('draft'), { target: { value: 'unsaved config edits' } });
    fireEvent.click(screen.getByText('pages.settings'));
    expect(screen.getByLabelText('draft')).toHaveValue('unsaved config edits');
    fireEvent.click(screen.getByText('common.cancel'));
    expect(screen.getByLabelText('draft')).toHaveValue('unsaved config edits');
  });
});
