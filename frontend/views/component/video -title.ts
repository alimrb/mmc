import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js';
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
  @property({ type: Boolean, attribute: 'no-animation' })
  noAnimation = false;

  @state()
  language = 'de';

  render() {
    return html`<div class="nonShown">${langChanged(() => (this.language = translateConfig.lang!))}</div>
      <slot
        dir="auto"
        @click=${() =>
          ((
            (((this.getRootNode() as ShadowRoot).host as HomePage).getRootNode() as ShadowRoot).host as PageView
          ).postfix = '')}
      ></slot>`;
  }

  static styles?: CSSResultGroup | undefined = css`
    .nonShown {
      display: none;
    }
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 90vw;
      max-height: 20vh;
      color: white;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 5vw;
    }

    ::slotted(*) {
      height: 0;
      overflow-y: hidden;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  `;

  @queryAssignedElements()
  assignedElements!: Array<HTMLElement>;

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('language')) {
      this.assignedElements.forEach((assignedElement) => {
        gsap.to(assignedElement, {
          height: 0,
        });
      });

      this.assignedElements.forEach((assignedElement) => {
        const langAttribute = assignedElement.getAttribute('lang');
        if (langAttribute)
          if (langAttribute === this.language) {
            gsap.to(assignedElement, {
              height: '10rem',
            });
          }
      });
    }
  }

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
          .to(this, { top: () => '5rem' })
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

    if (!this.noAnimation) animateCharsColor(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-title': VideoTitle;
  }
}
