
let nextID = 0;

function generateID() {
    return ``
}

export default class LexicalInput extends HTMLElement {

    createdCallback() {
        this.render();
    }

    attachedCallback() {
        let input = this.querySelector('input');
        if (input) {
            input.addEventListener('focus', (event) => {
                let label = this.querySelector('label');
                if (label) {
                    this.setAttribute('focused', 'focused');
                    label.classList.add('offset');
                }
            }, false);
            input.addEventListener('blur', (event) => {
                this.removeAttribute('focused');
                let input = this.querySelector('input');
                let label = this.querySelector('label');
                if (input && label && !input.value) {
                    label.classList.remove('offset');
                }
            });
        }
    }

    render() {
        let list = Array.prototype.slice.call(this.attributes);
        let hash = list.reduce(function(hash, item) {
            hash[item.name] = item.value;
            return hash;
        }, {});
        this.innerHTML = this.template(hash);
    }

    template(data) {
        data = data || {};
        if (data.id == null) {
            data.id = generateID();
        }
        return `
            <div class="content">
                <input id="${data.id}__input" type="text" />
                ${data.label ? `<label for="${data.id}__input">${data.label}</label>` : ''}
            </div>
            <div class="underline">
                <div class="focused"></div>
            </div>
        `;
    }
}

document.registerElement('lexical-input', LexicalInput);
