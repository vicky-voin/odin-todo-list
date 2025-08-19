import autosize from "autosize";
import { ViewComponent } from "./viewComponent";
import "./dynamicTextArea.css";

export class DynamicTextArea extends ViewComponent
{
    constructor(document){
        super();

        const textArea = document.createElement('textarea');
        textArea.className = "dynamic-text-area";

        autosize(textArea);

        textArea.addEventListener('change', () => {
            autosize.update(textArea);
        });

        this.__domObject = textArea;

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
}