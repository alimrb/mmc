import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, query, queryAssignedElements } from 'lit/decorators';
import 'iconify-icon';
import { rotateColor } from 'Frontend/utils/animation-utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './close-button';
import { CloseButton } from './close-button';

@customElement('toolbox-element')
export class ToolBox extends LitElement {
  render() {
    return html`<close-button id="closeButton" init-state="open"
      ><iconify-icon id="closeButtonIcon" icon="openmoji:hamburger-menu" width="24" height="24"></iconify-icon>
      <div id="slotContainer"><slot></slot></div
    ></close-button>`;
  }

  @queryAssignedElements({ selector: 'iconify-icon' })
  icons!: Array<HTMLElement>;

  @query('#slotContainer')
  slotContainer!: HTMLDivElement;

  @query('#closeButtonIcon')
  closeIcon!: HTMLElement;

  @query('#closeButton')
  closeButton!: CloseButton;

  static styles?: CSSResultGroup | undefined = css`
    #closeButtonIcon {
      position: fixed;
      top: 2.2rem;
      z-index: 3;
    }
    :host {
      z-index: 2;
    }

    #slotContainer {
      flex-direction: row;
      position: fixed;
      top: 3rem;
      transform: scale(2);
      height: 2rem;
      left: 2rem;
      width: 90vw;
      display: flex;
      justify-content: center;
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
        gsap
          .timeline({
            scrollTrigger: {
              trigger: this,
              start: '0',
              end: () => window.innerHeight,
              toggleActions: 'play none resume reset',
              onEnter: () => this.closeButton.initState = "close"
            },
          })
          .to(this.slotContainer, {
            height: '30vh',
            width: '2rem',
            left: '90vw',
            justifyContent: 'space-between',
            alignItems: 'center',
            top: '40vh',
            flexDirection: 'column',
          })
          .to(this.closeIcon, {
            top: '87vh',
            left: '90vw',
          })
      )
      .add('(min-width: 800px)', () =>
        gsap.to(this.slotContainer, {
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
