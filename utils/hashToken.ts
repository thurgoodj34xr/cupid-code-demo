import {createHash, createDecipheriv} from "crypto";

export default function hashToken(token: any) {
    return createHash('sha1').update(token).digest('hex');

}
