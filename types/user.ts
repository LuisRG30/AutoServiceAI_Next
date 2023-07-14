export type TokenInfo = {
    exp: number;
    iat: number;
    jti : string;
    token_type : "access" | "refresh";
    user_id : number;
}

// todo: remove optional fields. They will not optional in the backend

export type Profile = {
    admin: boolean;
}

export type UserInfo = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    profile?: Profile;
}

export type UserType = UserInfo & TokenInfo;