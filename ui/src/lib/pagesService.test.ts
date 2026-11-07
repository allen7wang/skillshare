import { it, expect } from 'vitest';
import { getPagesService } from './pagesService';
it('keeps the Pages router prefix out of the HTTPS service API base', () => {
  (window as Window & { __PAGES_BASE__?: string }).__PAGES_BASE__ = '/skillshare-web';
  localStorage.setItem('pages-service:/skillshare-web/', 'https://service.example.com/backend/');
  expect(getPagesService()).toBe('https://service.example.com/backend');
  for (const value of ['http://service.example.com', 'https://user:password@service.example.com', 'https://service.example.com?token=private']) {
    localStorage.setItem('pages-service:/skillshare-web/', value);
    expect(getPagesService()).toBe('');
  }
});
