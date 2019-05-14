import { LitElement, html, css } from 'lit-element';

export default class Form extends LitElement {
  constructor() {
    super();
    this.task = "";
  }
/*
  firstUpdated() {
    this.shadowRoot.querySelector('img')
      .addEventListener('load', () => {
        this.shadowRoot
          .querySelector('.placeholder')
          .classList.add('fade');
      });
  }*/

  static get styles() {
   /* return css`
      :host {
        display: block;
        position: relative;
      }

      .card {
        position: relative;
        margin-bottom: 12px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: var(--app-header-shadow);
        margin: 1rem;
      }
      .card a {
        display: block;
        text-decoration: none;
      }

    `;*/
  }

  static get properties() {
    return {
      task: { type: String },
      
    };
  }

  initForm(task) {
    this.task = task;
  }

 /* swapImage() {
    this.shadowRoot.querySelector('img')
      .src = this.src;
  }*/

  render() {
    return html`
    <div class="input-field inline">
        <input id="text" type="text" class="validate">
        <label for="text">Enter a new task here</label>
    </div>
    `;
  }
}

customElements.define('app-form', Form);