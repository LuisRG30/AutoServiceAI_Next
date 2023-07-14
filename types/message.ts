import { DocumentType } from "./document";
import { PaymentType } from "./payment";
import { UserInfo } from "./user"

export type  MessageType = {
    id: string;
    conversation: string;
    from_user: UserInfo;
    image?: string;
    document?:DocumentType;
    payment?:PaymentType;
    message?: string;
    read: boolean;
    created_at: string;
}