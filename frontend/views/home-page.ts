import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators';
import './component/page-loader';
import { PageView } from './page-view';
import './component/close-button';

@customElement('home-page-element')
export class HomePage extends LitElement {
  shareDescription = 'munich my city';
  render() {
    return html`<page-progress-bar>
        <h4>munich my city</h4>
        <h4>read more</h4>
        <h4>menu</h4> </page-progress-bar
      ><language-selector
        ><iconify-icon id="de" icon="noto-v1:flag-for-flag-germany" width="36" height="36"></iconify-icon
        ><iconify-icon
          id="en"
          style="color: yellow;"
          icon="icon-park-solid:english"
          width="36"
          height="36"
        ></iconify-icon>
        <h2 id="fa">فا</h2></language-selector
      ><scroll-down></scroll-down>
      <toolbox-element
        ><iconify-icon
          icon="carbon:home"
          @click=${() =>
            ((
              (((this.getRootNode() as ShadowRoot).host as HomePage).getRootNode() as ShadowRoot).host as PageView
            ).postfix = '')}
        ></iconify-icon
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
        ><iconify-icon icon="logos:google-maps"></iconify-icon></toolbox-element
      ><page-loader
        ><video-loader
          ><page-description
            ><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div lang="fa">
              <h3>
                اگر برای رفتن به برلین به دنبال هماهنگی برای تهیه بلیط گروهی با دیگران هستید، می توانید از طریق گروه
                متصل به این کانال اقدام کنید:
              </h3><img style="width: 20vw" src="images/1.jpg">
            </div></page-description
          ><video-title no-animation
            ><h1 lang="fa">تظاهرات بزرگ برلین</h1>
            <h1 lang="de">Große Berliner Demonstration</h1>
            <h1 lang="en">Great Berlin Demonstration</h1></video-title
          ><img id="backgroundImage" src="images/0.jpg" /></video-loader
      ></page-loader>`;
  }

  static styles?: CSSResultGroup | undefined = css`
    #backgroundImage {
      max-width: 100vw;
      max-height: 100vh;
      object-fit: contain;
      z-index: -1;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {}
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page-element': HomePage;
  }
}
