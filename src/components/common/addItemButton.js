import "./addItemButton.css"
import { DynamicTextArea } from "./dynamicTextArea";
import { ViewComponent } from "./viewComponent";

export class AddItemButton extends ViewComponent
{
    constructor(document)
    {
        super();

        const button = document.createElement('button');
        button.classList.add('add-item-button');
        button.addEventListener('click', () =>
        {
            this.__eventEmitter.emit('selected');
        });

        const icon = document.createElement('button');
        icon.classList.add("add-item-icon");

        const text = new DynamicTextArea(document).domObject;
        text.placeholder = "Add item";
        text.classList.add("add-item-text");

        icon.addEventListener("click", () => {
            if(text.value && text.value.trim())
            {
                this.__eventEmitter.emit("submit", text.value.trim());
                text.value = "";
            }
        });

        button.appendChild(icon);
        button.appendChild(text);

        this.__domObject = button;
    }
}