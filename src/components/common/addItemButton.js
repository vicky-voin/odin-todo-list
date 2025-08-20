import "./addItemButton.css"
import { ViewComponent } from "./viewComponent";
import plusIcon from "../../img/plus-circle.svg"

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

        const icon = document.createElement('img');
        icon.src = plusIcon;
        icon.classList.add("add-item-icon");

        const text = document.createElement('div');
        text.textContent = "Add item";
        text.classList.add("add-item-text");

        button.appendChild(icon);
        button.appendChild(text);

        this.__domObject = button;
    }
}