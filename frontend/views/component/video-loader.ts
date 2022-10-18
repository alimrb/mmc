import { randomOf } from 'Frontend/utils/random-utils';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, query, queryAssignedElements } from 'lit/decorators';
import { PageDescription } from './page-description';
import { VideoTitle } from './video -title';

@customElement('video-loader')
export class VideoLoader extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
  

  @queryAssignedElements({ selector: 'video' })
  videoElement!: Array<HTMLVideoElement>;

  @queryAssignedElements({selector: "page-description"})
  pageDescriptionElements!: Array<PageDescription>;

  @queryAssignedElements({ selector: 'video-title' })
  videoTitle!: Array<VideoTitle>;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: relative;
      display: flex;
      height: 500vh;
      width: 100vw;
      background-color: black;
    }

    ::slotted(video) {
      position: absolute;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      z-index: -1;
    }

    ::slotted(video-title) {
      top: 7.5%;
      transform: translate(-50% -7.5%);
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    gsap.registerPlugin(ScrollTrigger);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: this.videoElement[0],
          start: '0',
          end: '+=500%',
          pin: this,
          pinSpacing: false,
          toggleActions: 'play none resume reset',
        },
      })
      .to(this.videoElement[0], {
        scrollTrigger: {
          trigger: this.videoElement[0],
          start: 'top top-=50%',
          end: "bottom bottom",
          toggleActions: 'play none resume reset',
        },
        filter: 'brightness(0.4)',
        webkitFilter: 'brightness(0.4)',
      });

    ScrollTrigger.refresh();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-loader': VideoLoader;
  }
}
function internalProperty() {
  throw new Error('Function not implemented.');
}

