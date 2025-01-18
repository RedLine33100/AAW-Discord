import {Document, MongoClient, ObjectId, OptionalId, FindCursor, WithId} from 'mongodb';

export class MongoManager {

    private uri = "mongodb://" + process.env.MONGO_USER + ":" + encodeURIComponent(process.env.MONGO_PASSWORD || "null") + "@" + process.env.MONGO_URL+"?retryWrites=true&w=majority";

    private client = new MongoClient(this.uri);

    public async listDatabases(client: MongoClient): Promise<void> {
        let databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    constructor() {
        this.client.connect().then(async client => {
            console.log("Connected to MongoDB...");
            await this.listDatabases(client);
        }).catch((e:any) => {
            console.error(e);
            console.log(this.uri);
        }).finally(async () => this.client.close());
    }

    public insertData(db: string, collection: string, data: OptionalId<Document>):Promise<ObjectId | null>{

        return this.client.connect().then(client => {
            return client.db(db).collection(collection).insertOne(data).then(tr => {
                return tr.insertedId;
            })
        }).catch(e => {
            console.error(e);
            return null;
        }).finally(() => {
            this.client.close();
        });

    }

    public findOneByElement(db:string, collection:string,search:Document) : Promise<Document | null> {

        return this.client.connect().then(async client => {
            return client.db(db).collection(collection).findOne(search)
        }).catch(e => {
            console.error(e);
            return null;
        }).finally(() => {
            this.client.close();
        });

    }

    public findAllByElement(db:string, collection:string,search:Document) : Promise<FindCursor<WithId<Document>> | null> {

        return this.client.connect().then(async client => {
            return client.db(db).collection(collection).find(search)
        }).catch(e => {
            console.error(e);
            return null;
        }).finally(() => {
            this.client.close();
        });

    }

    public updateOneByElement(db:string, collection:string,search:Document, updatedListing:Document) : Promise<Document | null> {

        return this.client.connect().then(async client => {
            return client.db(db).collection(collection).updateOne(search, { $set: updatedListing });
        }).catch(e => {
            console.error(e);
            return null;
        }).finally(() => {
            this.client.close();
        });

    }

    public deleteOneByElement(db:string, collection:string,search:Document) : Promise<Document | null> {

        return this.client.connect().then(async client => {
            return client.db(db).collection(collection).deleteOne(search);
        }).catch(e => {
            console.error(e);
            return null;
        }).finally(() => {
            this.client.close();
        });

    }

}