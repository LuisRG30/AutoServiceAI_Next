import { MessageType } from './message';

export type DocumentType = {
    id: number;
    name?: string;
    file?: string;
    message?: MessageType;
    conversation: string;
    requirement: string;
    staging: boolean;
    created_at: string;
    updated_at: string;
}