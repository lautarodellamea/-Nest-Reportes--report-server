import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Lautaro Della Mea' });

    // creamos un documento usando el printerService mediante la inyeccion de dependencias
    const doc = this.printerService.createPdf(docDefinition);
    return doc;

    // return this.employees.findFirst();
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    // creamos un documento usando el printerService mediante la inyeccion de dependencias
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
