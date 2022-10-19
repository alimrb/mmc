import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators';
import 'iconify-icon';
import { rotateColor } from 'Frontend/utils/animation-utils';

@customElement('close-button')
export class CloseButton extends LitElement {
  @state()
  closed = false;

  @property({ attribute: 'init-state' })
  initState = 'open';

  render() {
    return html`<slot></slot>`;
  }

  @queryAssignedElements({ selector: 'iconify-icon' })
  closButtonElements!: Array<HTMLElement>;

  @queryAssignedElements({ selector: 'div' })
  divElements!: Array<HTMLDivElement>;

  static styles?: CSSResultGroup | undefined = css`
    :host {
      position: relative;
      z-index: 2;
    }

    * {
      padding: 0;
      margin: 0;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {}

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('initState')) {
      this.closed = this.initState === 'close';
    }
    if (_changedProperties.has('closed')) {
      this.closButtonElements[0].style.color = 'white';

      this.closButtonElements[0].onclick = () => {
        this.closed = !this.closed;
      };

      if (this.closed) {
        this.closButtonElements[0].setAttribute('icon', 'system-uicons:menu-hamburger');
        this.divElements[0].style.display = 'none';
      } else {
        this.closButtonElements[0].setAttribute('icon', 'ep:close');
        this.divElements[0].style.display = 'flex';
      }

      if (!this.closed) {
        rotateColor(this.closButtonElements[0]);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'close-button': CloseButton;
  }
}
