import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

// Use Vite env variables (must be prefixed with VITE_ to be exposed to the browser)
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

let account: Account | any;
let databases: Databases | any;
let storage: Storage | any;
let clientInstance: Client | null = null;

if (!projectId) {
    console.warn('VITE_APPWRITE_PROJECT_ID is not set — using browser-safe mocks for development.');

    const mockPromise = (result: any) => Promise.resolve(result);

    account = {
        createSession: () => mockPromise({}),
    };

    databases = {
        listDocuments: (_dbId: string, _collectionId: string) => mockPromise({ documents: [] }),
        getDocument: (_dbId: string, _collectionId: string, _docId: string) => mockPromise({}),
    };

    storage = {
        getFileView: () => mockPromise({}),
    };

    clientInstance = null;
} else {
    client.setEndpoint(endpoint).setProject(projectId);

    account = new Account(client);
    databases = new Databases(client);
    storage = new Storage(client);
    clientInstance = client;
}

export { account, databases, storage, clientInstance };
