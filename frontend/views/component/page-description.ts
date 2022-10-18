import { css, CSSResultGroup, html, LitElement, PropertyValueMap, PropertyValues } from 'lit';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { langChanged, translateConfig } from 'lit-translate';
import './language-selector';
import { animateWordsColor } from 'Frontend/utils/animation-utils';

@customElement('page-description')
export class PageDescription extends LitElement {
  @state()
  language = '';

  render() {
    return html`<div class="nonShown">${langChanged(() => (this.language = translateConfig.lang!))}</div>
      <slot></slot>`;
  }

  static styles?: CSSResultGroup | undefined = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: start;
      top: 6rem;
      left: 1rem;
      position: absolute;
      width: calc(90vw - 4rem);
      height: 75vh;
      overflow: hidden;
      color: white;
      padding: 1rem;
      opacity: 0;
    }

    .nonShown {
      display: none;
    }

    @media only screen and (max-width: 1024px) {
      * {
        font-size: large;
      }
    }

    @media only screen and (min-width: 1025px) {
      :host {
        left: 35rem;
        width: calc(40vw - 4rem);
        height: 50vh;
        top: 20rem;
        opacity: 1;
        transform: scale(1.5);
      }

      ::slotted(div) {
        overflow: hidden !important;
        display: flex;
        flex-direction: column;
      }
    }

    ::slotted(*) {
      padding: 0;
      margin: 0;
      text-transform: lowercase;
      max-width: -webkit-fill-available;
      overflow-wrap: break-word;
      word-wrap: break-word;
      color: transparent;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: white;
    }

    ::slotted(div) {
      display: flex;
      flex-direction: column;
      height: 0;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  `;

  @queryAssignedElements({ selector: 'div' })
  slottedDivElements!: Array<HTMLDivElement>;

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('language')) {
      this.slottedDivElements.forEach((div) => {
        const lang = div.getAttribute('lang');
        if (lang !== this.language) {
          gsap.to(div, {
            height: "0",
          });
        }
      });

      this.slottedDivElements.forEach((div) => {
        const lang = div.getAttribute('lang');
        if (lang === this.language) {
          gsap.to(div, {
            height: "75vh",
            duration: 1,
            display: "flex"
          });
        }

        div.querySelectorAll('*').forEach(element => {
          (element as HTMLElement).style.margin = "0";
        })

        if (this.language === 'de') div.style.textTransform = 'inherit';
      });
    }
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.slottedDivElements.forEach((div) => {
      div.style.maxWidth = '-webkit-fill-available';
      div.querySelectorAll('*').forEach((elem) => {
        (elem as HTMLElement).style.maxWidth = '-webkit-fill-available';
        (elem as HTMLElement).style.overflowWrap = 'anywhere';
      });
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap
      .matchMedia()
      .add('(max-width: 799px)', () =>
        gsap.to(this, {
          scrollTrigger: {
            trigger: this,
            start: () => 'top top-=' + window.innerHeight / 2,
            end: () => '+=' + window.innerHeight,
            toggleActions: 'play reverse play reset',
          },
          autoAlpha: 1,
        })
      )
      .add('(min-width: 800px)', () =>
        gsap.to(this, {
          scrollTrigger: {
            trigger: this,
            start: () => 'top top-=' + window.innerHeight / 2,
            end: () => '+=' + window.innerHeight * 4,
            toggleActions: 'play reverse play reset',
          },
          autoAlpha: 1,
        })
      );
    animateWordsColor(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-description': PageDescription;
  }
}
