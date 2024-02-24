import bcrypt from "bcryptjs";

export default function hashToken(token: any) {
    return bcrypt.hashSync(token,12)
}
