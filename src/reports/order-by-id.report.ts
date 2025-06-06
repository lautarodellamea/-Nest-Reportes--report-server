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

//  podriamos poner todo esto en otro archivo de interfaces
export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {
  const { data } = values;
  const { order_id, order_date, customers, order_details } = data;
  // console.log(data);

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.15;

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
                text: `Recibo No#: ${order_id}\n`,
                bold: true,
                style: {
                  fontSize: 12,
                },
              },
              `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(
                order_date,
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
          Razón Social: ${customers.customer_name}
          Nombre: ${customers.contact_name}
          Direccion: ${customers.address}
          Ciudad: ${customers.city}
          Codigo Postal: ${customers.postal_code}
          Pais: ${customers.country}
          `,
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
            ...order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity.toLocaleString(),
              {
                text: CurrencyFormatter.format(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.format(
                  detail.quantity * parseFloat(detail.products.price),
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },

      // salto de linea
      '\n\n',

      // totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.format(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.format(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
