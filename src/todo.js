export class Step
{
    #text = ''
    #isComplete = false

    constructor(text)
    {
        this.#text = text;
    }

    setIsComplete(isComplete)
    {
        this.#isComplete = isComplete;
    }
}

export const Priority = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low"
}

export class ToDo
{
    #id = crypto.randomUUID();
    #title;
    #description = '';
    #priority = Priority.MEDIUM;
    #steps = [];
    #isComplete = false;

    constructor (title)
    {
        this.#title = title;
        console.log(`ToDo created, Title: ${this.#title}, ID: ${this.#id}`);
    }

    get Id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get priority() {
        return this.#priority;
    }

    set priority(value) {
        this.#priority = value;
    }

    get steps() {
        return this.#steps;
    }

    addStep(stepName)
    {
        let step = new Step(stepName);
        this.#steps.push(step);

        return step;
    }

    getStep(index)
    {
        this.#steps[index];
    }

    get isComplete() {
        return this.#isComplete;
    }

    set isComplete(value) {
        this.#isComplete = value;
    }

    setIsComplete(isComplete) {
        this.#isComplete = isComplete;
    }
}