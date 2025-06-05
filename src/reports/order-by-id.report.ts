import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer.section';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      // headres
      {
        text: 'Tucan Code',
        style: 'header',
      },

      // direccion y numero de recibo
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com',
          },
          {
            text: [
              {
                text: `Recibo No#: 10255\n`,
                bold: true,
                style: {
                  fontSize: 12,
                },
              },
              `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(
                new Date(),
              )}\nPagar antes de: 18 de mayo de 2024`,
            ],
            alignment: 'right',
          },
        ],
      },

      // QR
      { qr: 'https://devtalles.com', fit: 75, alignment: 'right' },

      // direccion del cliente
      {
        text: [
          {
            text: `Cobrar a: \n`,
            style: 'subheader',
          },
          `
          Razón Social: Richter Supermarkt
          Michael Holz
          Grenzacherweg 237`,
        ],
      },

      // tabla del detalle de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripcion', 'Cantidad', 'Precio', 'Total'],
            [
              '1',
              'Producto 1',
              1,
              10,
              {
                text: CurrencyFormatter.format(100),
                alignment: 'right',
              },
            ],
            [
              '2',
              'Producto 2',
              1,
              10,
              {
                text: CurrencyFormatter.format(1500),
                alignment: 'right',
              },
            ],
            [
              '3',
              'Producto 3',
              1,
              10,
              {
                text: CurrencyFormatter.format(100),
                alignment: 'right',
              },
            ],
          ],
        },
      },

      // salto de linea
      '\n\n',

      // totales
    ],
  };
};
