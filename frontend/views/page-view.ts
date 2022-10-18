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
    return html`<page-progress-bar>
        <h4 @click=${() => window.scrollTo(0, 0)}>smart solutions</h4>
        <h4 @click=${() => window.scrollTo(0, window.innerHeight)}>read more</h4>
        <h4 @click=${() => window.scrollTo(0, window.innerHeight * 2)}>menu</h4> </page-progress-bar
      ><language-selector
        ><iconify-icon id="de" icon="noto-v1:flag-for-flag-germany" width="36" height="36"></iconify-icon
        ><iconify-icon
          id="en"
          style="color: yellow;"
          icon="icon-park-solid:english"
          width="36"
          height="36"
        ></iconify-icon></language-selector
      ><scroll-down></scroll-down
      ><toolbox-element
        ><iconify-icon icon="carbon:home" @click=${() => (this.postfix = '')}></iconify-icon
        ><iconify-icon
          @click=${() => window.open('mailto:services@solutions.inetseite.de', '_blank')}
          icon="eva:email-outline"
        ></iconify-icon
        ><iconify-icon icon="icon-park:twitter"></iconify-icon><iconify-icon icon="logos:facebook"></iconify-icon
        ><iconify-icon icon="line-md:instagram"></iconify-icon
        ><iconify-icon
          icon="el:share-alt"
          @click=${() =>
            navigator.share({ url: window.location.href, text: this.shareDescription, title: document.title })}
        ></iconify-icon
        ><iconify-icon icon="logos:whatsapp-icon" @click=${() => window.open('https://wa.me/', '_blank')}></iconify-icon
        ><iconify-icon icon="logos:telegram" @click=${() => window.open('https://t.me/alimrb', '_blank')}></iconify-icon
        ><iconify-icon icon="logos:google-maps"></iconify-icon
      ></toolbox-element>
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
    const nextTitle = 'smart solutions';
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
