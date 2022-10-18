import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, query } from 'lit/decorators';
import 'iconify-icon';
import { animateCharsColor, rotateColor } from 'Frontend/utils/animation-utils';
import gsap from 'gsap';
import { randomFromTo } from 'Frontend/utils/random-utils';
import ScrollTrigger from 'gsap/ScrollTrigger';

@customElement('scroll-down')
export class ScrollDown extends LitElement {
  render() {
    return html`<iconify-icon
        id="top"
        @click=${() => {
          window.scrollBy(0, -1 * window.innerHeight);
        }}
        icon="pajamas:scroll-up"
        width="1rem"
        height="1rem"
      ></iconify-icon
      ><iconify-icon
        id="down"
        @click=${() => {
          window.scrollBy(0, window.innerHeight);
        }}
        icon="pajamas:scroll-down"
        width="1rem"
        height="1rem"
      ></iconify-icon>`;
  }

  @query('#top')
  topElement!: HTMLElement;

  @query('#down')
  downElement!: HTMLElement;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: fixed;
      display: flex;
      flex-direction: row;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }

    * {
      padding: 0;
      margin: 0;
      cursor: pointer;
    }

    #top {
      margin-right: 2rem;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    rotateColor(this, 10);

    gsap.registerPlugin(ScrollTrigger);

    gsap.to([this.topElement, this.downElement], {
      y: 5,
      repeat: -1,
      yoyo: true,
      duration: 1,
      repeatRefresh: true,
      scale: () => randomFromTo(2, 3),
    });

    gsap.to(this.downElement, {
      scrollTrigger: {
        trigger: this.downElement,
        start: () => 1.7 * window.innerHeight,
        toggleActions: 'play none resume reset',
      },
      autoAlpha: 0,
    });

    gsap.to(this.topElement, {
      scrollTrigger: {
        trigger: this.topElement,
        start: 'top bottom',
        end: '+=100',
        toggleActions: 'play reverse restart reverse',
      },
      autoAlpha: 0,
    });

    ScrollTrigger.refresh();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'scroll-down': ScrollDown;
  }
}
