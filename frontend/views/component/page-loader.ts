import gsap from 'gsap';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, query, queryAssignedElements } from 'lit/decorators';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { VideoLoader } from './video-loader';
import { langChanged, translateConfig } from 'lit-translate';

@customElement('page-loader')
export class PageLoader extends LitElement {
  connectedCallback(): void {
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

  @queryAssignedElements({selector: 'video-loader'})
  videoLoaderElements!: Array<VideoLoader>

  static styles?: CSSResultGroup | undefined = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100vw;
    }

    ::slotted(*) {
      font-family: 'Noto Sans Arabic', sans-serif;
    }


  `;


  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    gsap.from(this, {
      autoAlpha: 0,
      duration: 1,
    });


    ScrollTrigger.refresh();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-loader': PageLoader;
  }
}
