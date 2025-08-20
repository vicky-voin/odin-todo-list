import { EventEmitter } from "events";

export const Priority = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low"
}

export class ToDo
{
    #id = crypto.randomUUID();
    #projectId = '';
    #title;
    #description = '';
    #priority = Priority.MEDIUM;
    #steps = [];
    #isComplete = false;
    
    #eventEmitter;

    constructor (title, options = {})
    {
        this.#eventEmitter = new EventEmitter();
        this.#title = title;
        
        // Apply optional properties if provided
        this.#description = options.description || '';
        this.#priority = options.priority || Priority.MEDIUM;
        this.#isComplete = options.isComplete || false;
        this.#projectId = options.projectId || '';
        
        // If steps are provided, add them
        if (options.steps && Array.isArray(options.steps)) {
            this.#steps = options.steps.map(stepName => new ToDo(stepName));
        }
        
        console.log(`ToDo created, Title: ${this.#title}, ID: ${this.#id}`);
    }

    get eventEmitter(){
        return this.#eventEmitter;
    }

    get id() {
        return this.#id;
    }

    get projectId() {
        return this.#projectId;
    }

    set projectId(value) {
        this.#projectId = value;
        this.#emitChange('projectId');
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
        this.#emitChange('title');
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
        this.#emitChange('description');
    }

    get priority() {
        return this.#priority;
    }

    set priority(value) {
        this.#priority = value;
        this.#emitChange('priority');
    }

    get steps() {
        return this.#steps;
    }

    addStep(stepName)
    {
        let step = new ToDo(stepName);
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
        this.#emitChange('isComplete');
    }

    #emitChange(propertyName)
    {
        this.#eventEmitter.emit(propertyName, this[propertyName]);
    }
}

function createDefaultTasks()
{
    return [
        new ToDo("Do 30 minutes of exercie",
            {
                description: "Follow that Youtube video with the cardio workout"
            }
        ),
        new ToDo("Buy milk",
            {
                steps: ["Get dressed", "Leave the house", "Walk to the store", "Get milk", "Walk back"]
            }
        ),
        new ToDo("Schedule a dentist appointment",
            {
                priority: Priority.HIGH
            }
        )
    ]
}

export {createDefaultTasks}