import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, query, queryAssignedElements } from 'lit/decorators';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { endBatch } from 'mobx/dist/internal';

@customElement('page-progress-bar')
export class ProgressBar extends LitElement {
  render() {
    return html`<div class="progressDiv"><progress max="100" value="0"></progress></div>
      <div class="titles"><slot></slot></div>`;
  }

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: fixed;
      flex-direction: column;
      display: flex;
      width: 100%;
      height: 35px;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .progressDiv {
      margin-top: -0.5rem;
      width: 100%;
      height: 2rem;
    }

    .titles {
      display: flex;
      flex-direction: row;
      color: yellow;
      padding-left: 10px;
      padding-right: 10px;
      justify-content: space-between;
      margin-top: -1.5rem;
      height: 1rem;
    }

    ::slotted(*) {
      padding: 0;
      margin: 0;
      font-size: large;
      cursor: pointer;
    }

    @media only screen and (min-width: 1025px) {
      ::slotted(*) {
        font-size: larger;
      }

      .titles {
        margin-top: -1.7rem;
      }

      .progressDiv {
        margin-top: -0.5rem;
        width: 100%;
        height: 2rem;
      }
    }

    * {
      padding: 0;
      margin: 0;
    }

    progress {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
    }

    progress::-webkit-progress-bar {
      background: transparent;
    }

    progress::-webkit-progress-value {
      background: linear-gradient(to left, #db38b5, #01b3e3, #25ce7b, #fdc741, #ff6b01, #fc4236);
      background-attachment: fixed;
    }

    progress::-moz-progress-bar {
      background: linear-gradient(to left, #db38b5, #01b3e3, #25ce7b, #fdc741, #ff6b01, #fc4236);
      background-attachment: fixed;
    }
  `;

  @query('progress')
  progressElement!: HTMLProgressElement;

  @query('.titles')
  titleElement!: HTMLElement;

  @queryAssignedElements()
  titleElements!: Array<HTMLElement>;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(this.progressElement, {
      value: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: this,
        start: '0',
        end: '+=200%',
        scrub: 0.3,
      },
    });

    this.titleElements?.forEach((titleElement, i) => {
      titleElement.onclick = () => {
        window.scrollTo(0, window.innerHeight * i);
      };
      gsap.to(titleElement, {
        repeat: -1,
        yoyo: true,
        y: -8,
        scrollTrigger: {
          trigger: titleElement,
          start: () => 'top top-=' + window.innerHeight * i * 0.69,
          end: () => '+=' + window.innerHeight,
          toggleActions: 'play reset play reset',
        },
      });
    });

    ScrollTrigger.refresh();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-progress-bar': ProgressBar;
  }
}
