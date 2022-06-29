export interface subAccountTypesValues {
    account: {
      identity: string,
      bankData: {
        bank: {
          code: string,
        },
        bankAgency: string,
        bankAgencyDigit: string,
        bankAccount: string,
        bankAccountDigit: string,
        accountType: {
          code: string,
        },
      },
      address: {
        zipCode: string,
        street: string,
        number: string,
        complement: string,
        district: string,
        cityName: string,
        stateInitials: string,
        countryName: string,
      },
    }
  }