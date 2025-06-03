import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';

// seteamos las fuentes
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};


// layouts personalizados
const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      // si el i es 1 es el encabezado y la linea sera negra, las demas grises
      return i === 1 ? 'black' : '#bfbfbf';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: function (i, node) {
      if (i === 0) {
        return '#6f83b3';
      }

      if (i === node.table.body.length - 1) {
        return '#869ed9';
      }

      // console.log(node.table.body.length);

      return i % 2 === 0 ? '#f5f5f5' : null;
    },
  },
};

@Injectable()
export class PrinterService {
  // instanciamos el printer
  // recordar agregar en el tsconfig: "esModuleInterop": true en el caso de que no funcione el controlador
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts, // ponemos a nivel global los layouts personalizados donde sea que usemos el printer (impresora)
    },
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
