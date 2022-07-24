import { BY_SUBSCRIPTION_TYPE, DEVICES_BY_TIME_DATA, USERS_BY_TIME_DATA } from '@domain/admin/admin.contants';

// Formato:
// 1ªIndex: ['labels:', 'campo-1', 'campo-2', 'campo-3']
// Demais indices: ['Nome coluna', 'valor-1', 'valor-2', 'valor-3']

export const generateRandomData = (numbers: number, min: number, max: number) => {
  const data = [];
  for (let i = 0; i < numbers; i++) {
    data.push((Math.floor(Math.random() * (max - min + 1)) + min));
  }
  return data;
}

export const ADMIN_USERS_MOCK = {
  [USERS_BY_TIME_DATA.MONTHLY]: [
    ['x', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    ['Produtores', ...generateRandomData(12, 100, 15000 * 30)],
    ['Afiliados', ...generateRandomData(12, 100, 15000 * 30)],
    ['Compradores', ...generateRandomData(12, 100, 15000 * 30)],
  ],
  [USERS_BY_TIME_DATA.DAILY]: [
    ['x', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['Produtores', ...generateRandomData(30, 100, 15000)],
    ['Afiliados', ...generateRandomData(30, 100, 15000)],
    ['Compradores',...generateRandomData(30, 100, 15000)],
  ],
  [USERS_BY_TIME_DATA.TODAY]: [
    ['x', '00h00', '01h00', '02h00', '03h00', '04h00', '05h00', '06h00', '07h00', '08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00', '19h00', '20h00', '21h00', '22h00', '23h00'],
    ['Produtores',...generateRandomData(24, 1, 500)],
    ['Afiliados', ...generateRandomData(24, 1, 500)],
    ['Compradores',...generateRandomData(24, 1, 500)],
  ],
};

export const ADMIN_DEVICES_MOCK = {
  [DEVICES_BY_TIME_DATA.SEVEN_DAYS]: [
    ["Desktop", "Mobile", "Tablet"],
    [...generateRandomData(3, 100, 15000)]
  ],
  [DEVICES_BY_TIME_DATA.THIRTY_DAYS]: [
    ["Desktop", "Mobile", "Tablet"],
    [...generateRandomData(3, 100, 15000)]
  ],
  [DEVICES_BY_TIME_DATA.SIXTY_DAYS]: [
    ["Desktop", "Mobile", "Tablet"],
    [...generateRandomData(3, 100, 15000)]
  ],
};

export const ADMIN_SUBSCRIPTIONS_MOCK = {
  // Ultimos 6 meses (mes atual + 5)
  [BY_SUBSCRIPTION_TYPE.USERS]: [
    ['x', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    ['Usuários', ...generateRandomData(6, 1, 200)],
  ],
  [BY_SUBSCRIPTION_TYPE.ORDERS]: [
    ['x', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    ['Pedidos', ...generateRandomData(30, 100, 15000)],
  ]
};