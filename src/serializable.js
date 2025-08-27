import { Storage } from "./storage";

export class Serializable
{
    static storage = new Storage();

    save(key, value)
    {
        Serializable.storage.set(key, JSON.stringify(value));   
    }

    load(key, defaultValue)
    {
        let loadedString = Serializable.storage.get(key);
        console.log(loadedString);

        return loadedString? JSON.parse(loadedString) : defaultValue;
    }
}