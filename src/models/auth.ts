export enum UserType {
    STUDENT = "std",
    TEACHER = "tch",
    ADMIN = "adm",
}

export enum TokenType {
    AccessToken = "accessToken",
    RefreshToken = "refreshToken",
}

export interface JWT {
    accessToken: string
    refreshToken: string
}

export interface AccessJWT {
    exp: number
    iat: number
    userType: string
    userUUID: string
    sessionUUID: string
}

export interface RefreshJWT {
    exp: number
    iat: number
    userType: string
    userUUID: string
}