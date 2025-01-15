// Extensions to Request objects
declare global {
    namespace Express {
        export interface Request {
            authorization?: any;
        }
    }
}
