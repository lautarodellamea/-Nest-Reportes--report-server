import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

// si cambiamos el coutries en mi base de datos, solo cambiamos eso aca ya que trabajamos con Country
import { countries as Country } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountryReport = (options: ReportOptions): TDocumentDefinitions => {

  const { title, subTitle, countries } = options;

  return {
    pageOrientation: 'landscape', // pdf en horizontal
    header: headerSection({
      title: title ?? 'Reporte de países',
      subTitle: subTitle ?? 'Listado de países',
    }),

    footer: function (currentPage, pageCount, pageSize) {
      // console.log(currentPage, pageCount, pageSize);
      return footerSection(currentPage, pageCount, pageSize);
    },

    pageMargins: [40, 110, 40, 60],
    content: [
      {
        // podemos usar el customTableLayouts
        // layout: 'lightHorizontalLines',
        layout: 'customLayout01', // estilos, ver en documentacion
        table: {
          headerRows: 1, // número de filas de encabezado si pusieramos 2 serian las primeras 2 lineas
          /* Ancho de las columnas - *: ancho automático, auto: ancho mínimo, number: ancho en píxeles */
          widths: [50, 50, 70, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map(
              (country) => [
                country.id.toString(),
                country.iso2,
                country.iso3,
                {
                  text: country.name,
                  bold: true,
                },
                country.continent,
                country.local_name,
              ],
            ),

            ['', '', '', '', '', ``],
            ['', '', '', '', 'Total', {
              text: `${countries.length} paises`,
              bold: true,
            }],
          ],
        },
      },


      // podemos agregar otra tabla
      {
        text: 'Totales',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        // layout: 'customLayout01',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              {
                text: `Total de países`,
                colSpan: 2,
                bold: true,
              },
              {},
              {
                text: `${countries.length} paises`,
                bold: true,
              },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
