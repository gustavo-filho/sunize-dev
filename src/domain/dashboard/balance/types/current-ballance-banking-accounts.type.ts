/**REFATORAR NOVAMENTE,APÓS O SERVER SER REFATORADO PARA CAMEL CASE*/
export interface IBankingAccountsType {
  Address: {
    City: string;
    Complement: string;
    Country: string;
    District: string;
    Number: string;
    State: string;
    Street: string;
    ZipCode: string;
  };
  BankData: {
    Account: string;
    AccountDigit: string;
    AccountType: string;
    Agency: string;
    AgencyDigit: string;
    Bank: string;
    Bankname: string;
  };
  CommercialName: string;
  Email: string;
  Identity: string;
  ResponsibleIdentity: string;
  ResponsibleName: string;
}
