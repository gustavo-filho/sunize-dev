import { BY_TIME_DATA } from '@domain/admin/admin.contants';

// Formato:
// 1ªIndex: ['labels:', 'campo-1', 'campo-2', 'campo-3']
// Demais indices: ['Nome coluna', 'valor-1', 'valor-2', 'valor-3']

export const ADMIN_MOCK = {
  [BY_TIME_DATA.MONTHLY]: [
    ['x', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    ['Produtores', 1000, 3000, 5000, 1000, 6000, 8000, 12000, 9000, 600, 700, 200, 100],
    ['Afiliados', 780, 400, 300, 800, 900, 20, 1500, 2000, 3600, 8500, 7500, 450],
    ['Compradores', 12000, 15000, 19000, 15000, 12000, 4000, 6000, 1200, 3800, 9800, 450, 650],
  ],
  [BY_TIME_DATA.DAILY]: [
    ['x', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['Produtores', 1000, 3000, 5000, 1000, 6000, 8000, 12000, 9000, 600, 700, 200, 100, 1000, 3000, 5000, 1000, 6000, 8000, 12000, 9000, 600, 700, 200, 100, 1000, 3000, 5000, 1000, 6000, 8000],
    ['Afiliados', 780, 400, 300, 800, 900, 20, 1500, 2000, 3600, 8500, 7500, 450, 780, 400, 300, 800, 900, 20, 1500, 2000, 3600, 8500, 7500, 450, 780, 400, 300, 800, 900, 20],
    ['Compradores', 12000, 15000, 19000, 15000, 12000, 4000, 6000, 1200, 3800, 9800, 450, 650, 12000, 15000, 19000, 15000, 12000, 4000, 6000, 1200, 3800, 9800, 450, 650, 12000, 15000, 19000, 15000, 12000, 4000],
  ],
  [BY_TIME_DATA.TODAY]: [
    ['x', '00h00', '01h00', '02h00', '03h00', '04h00', '05h00', '06h00', '07h00', '08h00', '09h00', '10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00', '19h00', '20h00', '21h00', '22h00', '23h00'],
    ['Produtores', 12, 16, 24, 65, 98, 120, 148, 123, 112, 104, 98, 76, 65, 53, 43, 65, 98, 120, 148, 123, 112, 104, 98, 76],
    ['Afiliados', 196, 215, 182, 167, 156, 180, 120, 148, 123, 112, 104, 98, 12, 16, 24, 65, 98, 120, 148, 134, 156, 178, 198, 216],
    ['Compradores', 65, 87, 98, 115, 180, 189, 196, 215, 182, 167, 156, 180, 192, 187, 165, 143, 123, 121, 112, 98, 75, 67, 49, 32],
  ],
};