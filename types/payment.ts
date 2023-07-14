
export type PaymentType = {
    // message,
    id : number,
    description : string,
    amount_cents : number,
    paid : boolean,
    date_paid?: string,
    // created_at: string;
}