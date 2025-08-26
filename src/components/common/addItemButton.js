import "./addItemButton.css"
import { DynamicTextArea } from "./dynamicTextArea";
import { ViewComponent } from "./viewComponent";

export class AddItemButton extends ViewComponent
{
    constructor(document, isEditable = true)
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

        let text = null;
        if(isEditable)
        {
            const dynamicText = new DynamicTextArea(document);
            text = dynamicText.domObject;

            text.placeholder = "Add item";

            icon.addEventListener("click", () => {
                if(text.value && text.value.trim())
                {
                    document.activeElement.blur();
                    this.__eventEmitter.emit("submit", text.value.trim());
                    text.value = "";
                    dynamicText.refresh();
                }
            });
        }
        else
        {
            text = document.createElement('div');
            text.textContent = "Add item";
        }

        text.classList.add("add-item-text");

        button.appendChild(icon);
        button.appendChild(text);

        this.__domObject = button;
    }
}