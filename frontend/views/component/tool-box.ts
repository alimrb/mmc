import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, queryAssignedElements } from 'lit/decorators';
import 'iconify-icon';
import { rotateColor } from 'Frontend/utils/animation-utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsapTrial from 'gsap-trial';
import { endBatch } from 'mobx/dist/internal';
import { langChanged, translateConfig } from 'lit-translate';

@customElement('toolbox-element')
export class ToolBox extends LitElement {
  render() {
    return html`<slot></slot>`;
  }

  @queryAssignedElements({ selector: 'iconify-icon' })
  icons!: Array<HTMLElement>;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      width: 100vw;
      display: flex;
      flex-direction: row;
      position: fixed;
      top: 3rem;
      justify-content: center;
      transform: scale(2);
      height: 2rem;
      z-index: 2;
    }

    ::slotted(iconify-icon) {
      position: relative;
      margin-right: 0.2rem;
      cursor: pointer;
    }

    @media only screen and (min-width: 1025px) {
      :host {
        top: 4rem;
      }

     }

  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.icons.forEach((icon) => {
      rotateColor(icon);
    });

    gsap.registerPlugin(ScrollTrigger);

    gsap
      .matchMedia()
      .add('(max-width: 799px)', () =>
        gsap.to(this, {
          scrollTrigger: {
            trigger: this,
            start: '0',
            end: () => window.innerHeight,
            toggleActions: 'play none resume reset',
          },
          height: '30vh',
          width: '2rem',
          right: '5%',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: '40vh',
          flexDirection: 'column',
        })
      )
      .add('(min-width: 800px)', () =>
        gsap.to(this, {
          scrollTrigger: {
            trigger: this,
            start: '0',
            end: () => window.innerHeight,
            toggleActions: 'play none resume reset',
          },
          height: '30vh',
          width: '2rem',
          right: '10%',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: '50vh',
          flexDirection: 'column',
        })
      );

    ScrollTrigger.refresh();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'toolbox-element': ToolBox;
  }
}
