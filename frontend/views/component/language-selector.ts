import gsap from 'gsap';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap, PropertyValues } from 'lit';
import { customElement, queryAssignedElements, state } from 'lit/decorators';
import { langChanged, translateConfig, use } from 'lit-translate';
import ScrollTrigger from 'gsap/ScrollTrigger';

@customElement('language-selector')
export class LanguageSelector extends LitElement {
  @state()
  selected = 'de';

  render() {
    return html`<slot></slot>`;
  }

  @queryAssignedElements()
  iconifyIcons!: Array<HTMLElement>;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      z-index: 2;
      right: 5vw;
      top: 5rem;
    }

    ::slotted(*) {
      padding: 0;
      margin: 0;
      margin-left: .5rem;
      cursor: pointer;
    }

    ::slotted(h2) {
      padding: .25rem;
      color: white;
      border-radius: 5px;
      border: 1px solid white;
      line-height: 1.3rem;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.iconifyIcons.forEach((iconifyIcon) => {
      iconifyIcon.onclick = async () => {
        this.selected = iconifyIcon.id;
        use(this.selected);
      };
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
