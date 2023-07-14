import { MessageType } from "./message";
import { UserType } from "./user";

export interface ConversationType {
  id: string | number;
  user?: UserType;
  name: string;
  online_users: Array<UserType>;
  messages?: Array<MessageType>;
  last_message?: MessageType;
  assigned_to?: number | null;
  status: string;
  archived: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FocusedConversationType {
  id: string | number;
  name: string;
  user?: UserType 
  archived: boolean;
}
