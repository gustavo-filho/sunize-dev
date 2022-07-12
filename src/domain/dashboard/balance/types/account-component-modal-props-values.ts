import { IBankingAccountsType } from "./current-ballance-banking-accounts.type";

export interface IAccountComponentModalPropsValues {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    updateModal: boolean;
    dataUpdateBanking?: IBankingAccountsType;
}