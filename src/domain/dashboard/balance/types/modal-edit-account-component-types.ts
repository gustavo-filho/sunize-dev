import { bankingAccountsType } from "./current-ballance-banking-accounts.type";

export interface modalEditAccountComponentValue {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    dataUpdateBanking: bankingAccountsType
}