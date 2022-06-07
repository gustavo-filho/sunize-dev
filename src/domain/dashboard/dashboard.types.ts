export type Data = Array<[any, any]>;
export type Types = 'year' | 'month' | 'day';

export interface BasicInformations {
  salesAmmount: number;
  reimbursed: number;
  reimbursedPercent: number;
  performanceSales: number;
  performanceReimbursed: number;
  genetedTickets: number;
  paidTickets: number;
  ticketsConvertPercent: number;
}
