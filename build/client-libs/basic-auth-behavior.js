"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicAuth {
    getToken(credentials) {
        if (credentials) {
            const cr = credentials;
            return Buffer.from(`${cr.user}:${cr.token}`).toString("base64");
        }
        else if (credentials) {
            const cr = credentials;
            return cr.base64Token;
        }
        else {
            throw new Error(`Unknown credentials format: ${JSON.stringify(credentials)}`);
        }
    }
    ;
}
exports.BasicAuth = BasicAuth;
//# sourceMappingURL=basic-auth-behavior.js.map