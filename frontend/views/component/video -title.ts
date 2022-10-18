import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { randomFromTo, randomOf } from 'Frontend/utils/random-utils';
import { animateCharsColor } from 'Frontend/utils/animation-utils';
import { PageView } from '../page-view';
import { langChanged, translateConfig } from 'lit-translate';
import { HomePage } from '../home-page';

@customElement('video-title')
export class VideoTitle extends LitElement {
  render() {
    return html`<slot @click=${() =>
      ((
        (((this.getRootNode() as ShadowRoot).host as HomePage).getRootNode() as ShadowRoot).host as PageView
      ).postfix = '')}></slot>`;
  }

  static styles?: CSSResultGroup | undefined = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100vw;
      max-height: 20vh;
      color: white;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5vw;
    }

    ::slotted(*) {
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    gsap.registerPlugin(ScrollTrigger);

    gsap
      .matchMedia()
      .add('(max-width: 799px)', () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: this,
              start: 'top top',
              end: '+=500%',
              toggleActions: 'play pause resume reset',
            },
          })
          .to(this, { top: () => '4rem' })
          .to(this, {
            scale: 0.7,
            duration: 1,
          })
          .to(this, {
            left: () => '30%',
          });
      })
      .add('(min-width: 800px)', () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: this,
              start: 'top top',
              end: '+=500%',
              toggleActions: 'play pause resume reset',
            },
          })
          .to(this, { top: () => '5rem' })
          .to(this, {
            scale: 0.25,
            duration: 1,
          })
          .to(this, {
            left: () => '15%',
          });
      }).revert;
    animateCharsColor(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-title': VideoTitle;
  }
}
