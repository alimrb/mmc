import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { langChanged, translateConfig } from 'lit-translate';
import { customElement, queryAssignedElements, state } from 'lit/decorators';

@customElement('page-menu')
export class PageMenu extends LitElement {
  @state()
  language = '';

  render() {
    return html`<div class="nonShown">${langChanged(() => (this.language = translateConfig.lang!))}</div>
      <slot></slot>`;
  }

  @queryAssignedElements({ selector: 'div' })
  assignedElements!: Array<HTMLDivElement>;

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('language')) {
      this.assignedElements.forEach((assignedElement) => {
        const langAttribute = assignedElement.getAttribute('lang');
        if (langAttribute)
          if (langAttribute !== this.language) {
            gsap.to(assignedElement, {
              height: '0',
            });
          }

        if (langAttribute === this.language) {
          gsap.to(assignedElement, {
            height: '80vh',
          });
        }
      });
    }
  }

  static styles?: CSSResultGroup | undefined = css`
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      justify-content: end;
      align-items: start;
      overflow-y: hidden;
      opacity: 0;
      left: 10%;
      z-index: 1;
      width: 80vw;
      height: 80vh;
      top: calc(18vh - 5rem);
    }

    ::slotted(*) {
      padding: 0;
      margin: 0;
    }

    ::slotted(div) {
      display: flex;
      flex-direction: column;
      height: 0;
      width: 100%;
      justify-content: end;
      align-items: start;
      overflow-y: hidden;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(this, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: this,
        start: () => 'top top-=' + window.innerHeight * 1.5,
        end: () => '+=' + window.innerHeight * 5,
        toggleActions: 'play none resume reset',
      },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-menu': PageMenu;
  }
}
