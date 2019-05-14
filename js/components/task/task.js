import { LitElement, html, css } from 'lit-element';

export default class Task extends LitElement {
  constructor() {
    super();
    this.id = null;
    this.task = "";

  }

  firstUpdated() {
    this.shadowRoot.querySelector('img')
      .addEventListener('load', () => {
        this.shadowRoot
          .querySelector('.placeholder')
          .classList.add('fade');
      });
  }

  static get styles() {
    return css`
        `;
  }

  static get properties() {
    return {
        id: { type: Number },
        task : { type: String },
    };
  }

  initTask(id,task) {
    this.id = id;
    this.task = task;
  }

  render() {
    return html`
      <div class="item completed">
        <input checked="checked" type="checkbox" id="${this.id}" />
        <label for="${this.id}">${this.task.substring(0, 144)}</label>
      </div>
    `;
  }
}

customElements.define('app-task', Task);