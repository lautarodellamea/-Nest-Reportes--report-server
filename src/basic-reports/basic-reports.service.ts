import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// TODO: sera optimizado despues
import PdfPrnter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// seteamos las fuentes
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  hello() {
    // instanciamos el printer
    // recordar agregar en el tsconfig: "esModuleInterop": true en el caso de que no funcione el controlador
    const printer = new PdfPrnter(fonts);

    // definimos el documento
    const docDefinition: TDocumentDefinitions = {
      content: 'Hello world',
    };

    // creamos un documento
    const doc = printer.createPdfKitDocument(docDefinition);
    return doc;

    // return this.employees.findFirst();
  }
}
