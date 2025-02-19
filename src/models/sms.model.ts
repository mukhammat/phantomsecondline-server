export interface SmsModel {
    sender: string;
    receiver: string;
    text: string;
    is_outgoing?: 0 | 1;
    user_id: string; 
}