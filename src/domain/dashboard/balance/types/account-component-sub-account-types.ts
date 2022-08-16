export interface ISubAccountTypesValues {
  account: {
    Identity?: string;
    BankData?: {
      Bank?: {
        Code?: string;
      };
      BankAgency?: string;
      BankAgencyDigit?: string;
      BankAccount?: string;
      BankAccountDigit?: string;
      AccountType?: {
        Code?: string;
      };
    };
    Address?: {
      ZipCode?: string;
      Street?: string;
      Number?: string;
      Complement?: string;
      District?: string;
      CityName?: string;
      StateInitials?: string;
      CountryName?: string;
    };
  };
}
