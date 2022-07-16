import { BY_SUBSCRIPTION_TYPE, TRAFFIC_BY_TIME_DATA } from './infra.contants';

export const generateRandomData = (
  numbers: number,
  min: number,
  max: number,
) => {
  const data = [];
  for (let i = 0; i < numbers; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

export const INFRA_MOCK = {
  // 6 entradas
  [BY_SUBSCRIPTION_TYPE.CPU]: [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['Usuários', ...generateRandomData(6, 1, 200)],
  ],
  [BY_SUBSCRIPTION_TYPE.MEMORY]: [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['Usuários', ...generateRandomData(6, 1, 200)],
  ],
  [BY_SUBSCRIPTION_TYPE.DOWNTIME]: [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['Usuários', ...generateRandomData(6, 1, 200)],
  ],
};


export const TRAFFIC_MOCK = {
  [TRAFFIC_BY_TIME_DATA.MONTHLY]: [
    ['x', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    ['Trafego', ...generateRandomData(12, 100, 15000 * 30)],
  ],
  [TRAFFIC_BY_TIME_DATA.DAILY]: [
    ['x', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['Trafego', ...generateRandomData(30, 100, 15000)],
  ],
  [TRAFFIC_BY_TIME_DATA.TODAY]: [
    ['x', '00h00', '01h00', '02h00', '03h00', '04h00', '05h00', '06h00', '07h00', '08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00', '19h00', '20h00', '21h00', '22h00', '23h00'],
    ['Trafego',...generateRandomData(24, 1, 500)],
  ],
};
