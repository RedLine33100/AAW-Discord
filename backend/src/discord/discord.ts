type DiscordToken={
    accessToken: string;
    token_type: string;
    timeGenerated: number;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

function generateDiscordAuthURL(callbackRoute:string):string {
    return "https://discord.com/oauth2/authorize?client_id="+process.env.APP_ID+"&response_type=code&redirect_uri="+encodeURI(callbackRoute)+"&scope=identify+openid"
}

async function generateDiscordToken(code, state): Promise<DiscordToken> {

    const data={
        "grant_type": "authorization_code",
        "code": code,
        "redirect_URI": "???"
    }

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    const response = await fetch(process.env.DISCORD_API_URL + "/oauth2/token", {method: 'POST', headers: headers, body: JSON.stringify(data)});
    const json = await response.json();

    return {accessToken:json.access_token, token_type:json.token_type, timeGenerated:Date.now(), expires_in:json.expires_in, refresh_token:json.refresh_token, scope:json.scope}

}

function checkDiscordToken(token:DiscordToken):boolean {
    return token.timeGenerated+(token.expires_in*1000)<Date.now()
}

async function refreshDiscordToken(token:DiscordToken, refresh : boolean):Promise<DiscordToken> {
    if(checkDiscordToken(token))
        return token
    if(!refresh)
        return null
    const data={
        "grant_type": "refresh_token",
        "refresh_token": token.refresh_token,
        "redirect_URI": "???"
    }

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    const response = await fetch(process.env.DISCORD_API_URL + "/oauth2/token", {method: 'POST', headers: headers, body: JSON.stringify(data)});
    const json = await response.json();

    if(!response.ok)
        return null


    return {accessToken:json.access_token, token_type:json.token_type, timeGenerated:Date.now(), expires_in:json.expires_in, refresh_token:json.refresh_token, scope:json.scope}
}

async function revokeToken(token:DiscordToken):Promise<boolean> {
    var data = {
        'token': token.accessToken,
        'token_type_hint': 'access_token'
    }
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await fetch(process.env.DISCORD_API_URL + "/oauth2/token/revoke", {method: 'POST', headers: headers, body: JSON.stringify(data)});
    return response.ok;
}