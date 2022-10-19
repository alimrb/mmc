import { Router } from '@vaadin/router';
import { registerTranslateConfig, use } from 'lit-translate';
import { routes } from './routes';
import { appStore } from './stores/app-store';

export const router = new Router(document.querySelector('#outlet'));

const customUrl = [];

customUrl.push({
  path: ':page',
  component: 'page-view',
  action: async () => {
    await import('./views/page-view');
  },
});

customUrl.push({
  path: '',
  component: 'page-view',
  action: async () => {
    await import('./views/page-view');
  },
});

customUrl.push({
  path: '/',
  component: 'page-view',
  action: async () => {
    await import('./views/page-view');
  },
});

router.setRoutes(customUrl);

window.addEventListener('vaadin-router-location-changed', (e) => {
  appStore.setLocation((e as CustomEvent).detail.location);
  const title = appStore.currentViewTitle;
  if (title) {
    document.title = title + ' | ' + appStore.applicationName;
  } else {
    document.title = appStore.applicationName;
  }
});

registerTranslateConfig({
  loader: (lang) => import(`./i18n/${lang}.json`).then((mod) => mod.default),
});

use('de');