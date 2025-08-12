import EventEmitter from "events";
import "./dropdownTag.css"

export class DropdownTag
{
    #eventEmitter
    get eventEmitter() { return this.#eventEmitter; }

    #domObject;
    get domObject() { return this.#domObject };

    constructor(options, document)
    {
        this.#eventEmitter = new EventEmitter();

        const dropdown = document.createElement('select');
        dropdown.id = "tag-dropdown";
        dropdown.className = 'tag-dropdown';

        options.forEach(option => {
            let dropdownOption = document.createElement('option');
            dropdownOption.value = option;
            dropdownOption.textContent = option;
            dropdownOption.classList.add(`option-${option}`);

            dropdown.appendChild(dropdownOption);
        });

        dropdown.addEventListener('change', () => {
            options.forEach(option => {
                dropdown.classList.remove(`value-${option}`);
            });
            dropdown.classList.add(`value-${dropdown.value}`);
        });

        if (options.length > 0) {
            dropdown.classList.add(`value-${options[0]}`);
        }

        this.#domObject = dropdown;
    }
}