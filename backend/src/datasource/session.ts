import {Document, ObjectId} from "mongodb";
import {MONGO_MANAGER} from "../index.js";

export type Session = {
    _id:string,
    discordUSERID:string,
    expireDate:number,
    valid:boolean,
}

export function mapToSession(document:Document): Session{
    return {
        _id:document["_id"],
        discordUSERID : document["discordUSERID"],
        expireDate : document["expireDate"],
        valid:document["valid"],
    }
}

export async function searchSessions(discordID:string) : Promise<Session[] | undefined> {
    return new Promise<Session[] | undefined>(async (resolve, reject) => {

        const result = await MONGO_MANAGER.findAllByElement("user_auth", "token", {discordUSERID: discordID});

        if(!result){
            resolve(undefined);
            return;
        }

        resolve(result.map(value =>{
          return mapToSession(value);
        } ));

    })
}

export async function getSession(sessionid:string) : Promise<Session | undefined> {
    return new Promise<Session | undefined>(async (resolve, reject) => {

        const result = await MONGO_MANAGER.findOneByElement("user_auth", "token", {_id: new ObjectId(sessionid)});

        if(!result){
            resolve(undefined);
            return;
        }

        resolve(mapToSession(result));

    })
}

export async function updateSession(sessionid: string, session:Document) : Promise<Session | undefined> {
    return new Promise<Session | undefined>(async (resolve, reject) => {
        const result = await MONGO_MANAGER.updateOneByElement("user_auth", "token", {_id:{$eq:new ObjectId(sessionid)}}, session)
        console.log(result)
        if(!result){
            console.log("undefined")
            resolve(undefined);
            return;
        }
        resolve(mapToSession(result));
    })
}

export async function deleteSession(sessionid:string) : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        const result = await MONGO_MANAGER.deleteOneByElement("user_auth", "token", {_id: new ObjectId(sessionid)});
        resolve(result !== null);
    })
}