import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) { }

  getHtmlReport() {
    // const html = fs.readFileSync('src/reports/html/basic-01.html', 'utf8');
    // const html = fs.readFileSync('src/reports/html/basic-02.html', 'utf8');
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');
    // console.log(html);

    const content = getHtmlContent(html, {
      // aca pasamos datos al html
      client: 'Lautaro Della Mea',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'Html to PDFMake',
        subTitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      content: ['Hola Mundo', content],
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCommunity() {
    const docDefinition = getCommunityReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCustomSize() {
    const doc = this.printerService.createPdf({
      // pageSize: 'TABLOID', // tamaños definidos por pdfmake

      // tamaños customizados
      pageSize: {
        width: 150,
        height: 300,
      },
      content: [
        {
          qr: 'https://devtalles.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });

    return doc;
  }
}
