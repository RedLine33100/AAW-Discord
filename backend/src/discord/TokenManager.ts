// Token class

import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

class Token {
    expiration: Date;
    accountID: number;

    constructor(expiration: Date, accountID: number) {
        this.expiration = expiration;
        this.accountID = accountID;
    }

    isExpired(): boolean {
        return new Date() > this.expiration;
    }
}

// TokenManager class
class TokenManager {

    constructor() {
    }

    generateSession(): number {
        return 0;
    }

    generateToken(accountID: number): string {

        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        return jwt.sign({sessionID:this.generateSession()}, jwtSecretKey)

    }


    /*
        Return session ID
     */
    getSessionWithToken(token: string): number {

        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const decoded = jwt.verify(token, jwtSecretKey);

    }

    removeToken(key: string): void {
        this.tokens.delete(key);
    }

    hasToken(key: string): boolean {
        const token = this.tokens.get(key);
        return token !== undefined && !token.isExpired();
    }

    clearExpiredTokens(): void {
        for (const [key, token] of this.tokens.entries()) {
            if (token.isExpired()) {
                this.tokens.delete(key);
            }
        }
    }

    clearAllTokens(): void {
        this.tokens.clear();
    }
}

// Example usage
const tokenManager = new TokenManager();
const token = new Token("abc123", new Date(Date.now() + 60 * 1000)); // Token valid for 1 minute

tokenManager.addToken("user1", token);

console.log(tokenManager.getToken("user1")); // Token object
setTimeout(() => {
    console.log(tokenManager.getToken("user1")); // null (expired)
}, 61 * 1000);
