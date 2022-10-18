import gsap from 'gsap';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap, PropertyValues } from 'lit';
import { customElement, queryAssignedElements, state } from 'lit/decorators';
import { langChanged, translateConfig, use } from 'lit-translate';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { randomOf } from 'Frontend/utils/random-utils';
import { PageView } from '../page-view';

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @state()
  selected = 'de';

  render() {
    return html`<slot></slot>`;
  }

  @queryAssignedElements({ selector: 'iconify-icon' })
  iconifyIcons!: Array<HTMLElement>;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: fixed;
      display: flex;
      flex-direction: row;
      z-index: 2;
      right: 10vw;
      top: 2rem;
      opacity: 0;
    }

    ::slotted(iconify-icon) {
      cursor: pointer;
      padding-left: 1rem;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.iconifyIcons.forEach((iconifyIcon) => {
      iconifyIcon.onclick = async () => {
        this.selected = iconifyIcon.id;
        use(this.selected);
      };
    });
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(this, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: this,
        start: () => 'top top-=' + window.innerHeight / 2,
        toggleActions: 'play none resume reset',
      },
    });
  }

  animation!: gsap.core.Tween;

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('selected')) {
      if (this.animation) {
        this.animation.kill();
      }
      this.iconifyIcons.forEach((iconifyIcon) => {
        if (iconifyIcon.id === this.selected) {
          this.animation = gsap.to(iconifyIcon, {
            y: -4,
            repeat: -1,
            yoyo: true,
          });
        } else {
          gsap.to(iconifyIcon, {
            y: 4,
          });
        }
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'language-selector': LanguageSelector;
  }
}
