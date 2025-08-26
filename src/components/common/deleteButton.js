import "./deleteButton.css"
import { ViewComponent } from "./viewComponent";

export class DeleteButton extends ViewComponent
{
    constructor(document)
    {
        super();

        const button = document.createElement('button');
        button.className = "delete-button";
        button.textContent = "Delete";
        button.addEventListener('click', () => 
        {
            this.__eventEmitter.emit('delete');
        });

        this.__domObject = button;
    }
}