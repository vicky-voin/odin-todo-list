import EventEmitter from "events";
import "./dropdownTag.css"

export class DropdownTag
{
    #eventEmitter
    get eventEmitter() { return this.#eventEmitter; }

    #domObject;
    get domObject() { return this.#domObject };

    constructor(options, document, initialValue = options[0])
    {
        this.#eventEmitter = new EventEmitter();

        const dropdown = document.createElement('select');
        dropdown.id = "tag-dropdown";
        dropdown.className = 'tag-dropdown';

        this.#domObject = dropdown;

        options.forEach(option => {
            let dropdownOption = document.createElement('option');
            dropdownOption.value = option;
            dropdownOption.textContent = option;
            dropdownOption.classList.add(`option-${option}`);

            dropdown.appendChild(dropdownOption);
        });

        dropdown.addEventListener('change', () => {
            this.#updateValue(dropdown.value, options);
        });

        this.#updateValue(initialValue, options);

    }

    #updateValue(newValue, options)
    {
        this.#domObject.value = newValue;

        options.forEach(option => {
            this.#domObject.classList.remove(`value-${option}`);
        });
        this.#domObject.classList.add(`value-${this.#domObject.value}`);
        this.#eventEmitter.emit('valueChanged', this.#domObject.value);
    }
}