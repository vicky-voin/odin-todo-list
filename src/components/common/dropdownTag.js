import EventEmitter from "events";
import "./dropdownTag.css"
import { ViewComponent } from "./viewComponent";

export class DropdownTag extends ViewComponent
{
    constructor(options, document, initialValue = options[0])
    {
        super();
        
        this.__eventEmitter = new EventEmitter();

        const dropdown = document.createElement('select');
        dropdown.id = "tag-dropdown";
        dropdown.className = 'tag-dropdown';

        this.__domObject = dropdown;

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
        this.__domObject.value = newValue;

        options.forEach(option => {
            this.__domObject.classList.remove(`value-${option}`);
        });
        this.__domObject.classList.add(`value-${this.__domObject.value}`);
        this.__eventEmitter.emit('valueChanged', this.__domObject.value);
    }
}