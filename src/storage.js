export class Storage
{
    #storage;
    #storageIsAvailable;

    constructor()
    {
        this.#detectStorage();
    }

    set(key, value)
    {
        if(this.#storageIsAvailable)
        {
            this.#storage.setItem(key, value);
        }
    }

    get(key)
    {
        if(this.#storageIsAvailable)
        {
            return this.#storage.getItem(key);
        }
        else
        {
            return null;
        }
    }

    #detectStorage()
    {
        try
        {
            this.#storage = window["localStorage"];
            const x = "__storage_test__";
            this.#storage.setItem(x,x);
            this.#storage.removeItem(x);

            this.#storageIsAvailable = true;

            console.log("Local storage is available, data will be saved");
        }catch(e)
        {
            console.log(e);
            this.#storageIsAvailable = e instanceof DOMException &&
                            e.name === "QuotaExceededError" &&
                            this.#storage &&
                            this.#storage.length !== 0;
        }
    }
}