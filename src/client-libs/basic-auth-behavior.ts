import { Never } from "../types"

export interface UserAndToken {
  user: string;
  token: string;
}

export type Base64Token = { base64Token: string } & Never<UserAndToken>

export class BasicAuth {
  public getToken (credentials: UserAndToken | Base64Token): string {
    if (credentials as UserAndToken) {
      const cr = credentials as UserAndToken
      return Buffer.from(`${cr.user}:${cr.token}`).toString("base64")
    } else if (credentials as Base64Token) {
      const cr = credentials as Base64Token
      return cr.base64Token
    } else {
      throw new Error(`Unknown credentials format: ${JSON.stringify(credentials)}`)
    }
  };
}
