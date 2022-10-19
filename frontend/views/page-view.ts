import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, state } from 'lit/decorators';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './component/page-loader';
import './component/video-loader';
import './component/video -title';
import './component/scroll-down';
import './component/tool-box';
import './component/page-menu';
import './component/page-menu-item';
import { PageLoader } from './component/page-loader';
import gsap from 'gsap';
import { RouterLocation } from '@vaadin/router';
import './component/page-description';
import 'iconify-icon';
import './component/language-selector';
import './component/progress-bar';
import './home-page';

@customElement('page-view')
export class PageView extends LitElement {
  @query('page-loader')
  pageLoader!: PageLoader;

  @property()
  postfix = '';

  @property()
  shareDescription = "'smart solutions, do the right things'";

  @state()
  dynamicContentHtml = html`<home-page-element></home-page-element>`;

  static styles = css`
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;

  render() {
    return html`
      ${this.dynamicContentHtml} `;
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('postfix')) {
      this.updatePageView(this.postfix);
    }
  }

  private updatePageView(postfix: string) {
    window.scrollTo(0, 0);
    const nextURL = '/' + postfix;
    const nextTitle = 'munich my city';
    const nextState = { additionalInformation: '' };

    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);

    // This will replace the current entry in the browser's history, without reloading
    window.history.replaceState(nextState, nextTitle, nextURL);

    if (this.pageLoader)
      gsap.to(this.pageLoader, {
        autoAlpha: 0,
        duration: 0.1,
      });

    setTimeout(() => {
      window.scrollTo(0, 0);
      switch (postfix) {
        case '':
          console.log('home page is being loaded');

          this.dynamicContentHtml = html`<home-page-element></home-page-element>`;
          document.title = 'munich my city';
          break;
      }

      if (postfix !== '') setTimeout(() => window.scrollTo(0, window.innerHeight * 1.5), 2000);
    }, 400);
  }

  onBeforeEnter(location: RouterLocation) {
    if (location.params.page) this.postfix = String(location.params.page);
  }
}
