import { Document, MongoClient, ObjectId, OptionalId, WithId } from 'mongodb';

export class MongoManager {

    private uri = "mongodb://" + process.env.MONGO_USER + ":" + encodeURIComponent(process.env.MONGO_PASSWORD || "null") + "@" + process.env.MONGO_URL + "?retryWrites=true&w=majority";
    private client: MongoClient;

    constructor() {
        // Créer une instance du client MongoDB mais ne pas encore le connecter
        this.client = new MongoClient(this.uri, {});
    }

    // Méthode pour lister les bases de données
    public async listDatabases(): Promise<void> {
        let client = await this.client.connect();
        let databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    // Méthode pour insérer des données dans une collection
    public async insertData(db: string, collection: string, data: OptionalId<Document>): Promise<ObjectId | null> {
        try {
            let client = await this.client.connect();
            const result = await client.db(db).collection(collection).insertOne(data);
            return result.insertedId;
        } catch (e) {
            console.error("Erreur d'insertion:", e);
            return null;
        }
    }

    // Méthode pour trouver un document selon un critère
    public async findOneByElement(db: string, collection: string, search: Document): Promise<Document | null> {
        try {
            let client = await this.client.connect();
            const result = await client.db(db).collection(collection).findOne(search);
            return result;
        } catch (e) {
            console.error("Erreur de recherche:", e);
            return null;
        }
    }

    // Méthode pour trouver plusieurs documents
    public async findAllByElement(db: string, collection: string, search: Document): Promise<WithId<Document>[] | null> {
        try {
            let client = await this.client.connect();
            const result = await client.db(db).collection(collection).find(search).toArray();
            return result;
        } catch (e) {
            console.error("Erreur de recherche:", e);
            return null;
        }
    }

    // Méthode pour mettre à jour un document
    public async updateOneByElement(db: string, collection: string, search: Document, updatedListing: Document): Promise<Document | null> {
        try {
            let client = await this.client.connect();
            console.log(updatedListing)
            const result = await client.db(db).collection(collection).updateOne(search, {$set:updatedListing});
            console.log("Update result:", result);
            return result.modifiedCount > 0 ? updatedListing : null;
        } catch (e) {
            console.error("Erreur de mise à jour:", e);
            return null;
        }
    }

    // Méthode pour supprimer un document
    public async deleteOneByElement(db: string, collection: string, search: Document): Promise<Document | null> {
        try {
            let client = await this.client.connect();
            const result = await client.db(db).collection(collection).deleteOne(search);
            return result.deletedCount > 0 ? search : null;
        } catch (e) {
            console.error("Erreur de suppression:", e);
            return null;
        }
    }

    // Méthode pour fermer la connexion MongoDB
    public async close(): Promise<void> {
        await this.client.close();
    }
}
