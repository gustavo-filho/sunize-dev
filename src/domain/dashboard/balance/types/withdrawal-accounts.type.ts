import { bankingAccountsType } from "./current-ballance-banking-accounts.type";

export interface withdrawalAccountsType {
    data: bankingAccountsType;
    balanceAvailable: number;
}