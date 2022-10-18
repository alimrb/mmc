import { animateCharsColor, rotateColor } from 'Frontend/utils/animation-utils';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap } from 'lit';
import { langChanged, translateConfig } from 'lit-translate';
import { customElement, property, queryAssignedElements, state } from 'lit/decorators';
import { _allowStateChanges } from 'mobx';
import { HomePage } from '../home-page';
import { PageView } from '../page-view';

@customElement('page-menu-item')
export class PageMenuItem extends LitElement {
  render() {
    return html`<slot
      @click=${() =>
        ((
          (((this.getRootNode() as ShadowRoot).host as HomePage).getRootNode() as ShadowRoot).host as PageView
        ).postfix = this.postfix)}
    ></slot>`;
  }

  @property()
  postfix = '';


  static styles?: CSSResultGroup | undefined = css`
    :host {
      display: flex;
      padding: 0;
      margin: 0;
      color: white;
      z-index: 3;
    }

    .nonShown {
      display: none;
    }

    ::slotted(*) {
      font-size: x-large;
      margin: 0;
      padding: 0;
      cursor: pointer;
      color: transparent;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: white;
    }
  `;

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    animateCharsColor(this);
    rotateColor(this, 5);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-menu-item': PageMenuItem;
  }
}
