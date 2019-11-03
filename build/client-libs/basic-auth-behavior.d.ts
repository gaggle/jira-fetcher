import { Never } from "../types";
export interface UserAndToken {
    user: string;
    token: string;
}
export declare type Base64Token = {
    base64Token: string;
} & Never<UserAndToken>;
export declare class BasicAuth {
    getToken(credentials: UserAndToken | Base64Token): string;
}
