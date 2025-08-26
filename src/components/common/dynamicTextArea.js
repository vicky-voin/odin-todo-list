import autosize from "autosize";
import { ViewComponent } from "./viewComponent";
import "./dynamicTextArea.css";

export class DynamicTextArea extends ViewComponent
{
    #textArea;

    constructor(document){
        super();

        this.#textArea = document.createElement('textarea');
        this.#textArea.className = "dynamic-text-area";

        this.#textArea.addEventListener('change', () => {
            autosize.update(this.#textArea);
        });

        this.__domObject = this.#textArea;

        autosize(this.#textArea);

        const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach((node) => {
                                if (node === this.__domObject || node.contains?.(this.__domObject)) {
                                    autosize.update(this.__domObject);
                                    observer.disconnect();
                                }
                            });
                        }
                    });
                });
        
        if (!document.contains(this.__domObject)) {
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            autosize.update(this.__domObject);
        };
    }

    refresh()
    {
        autosize.update(this.#textArea);
    }
}