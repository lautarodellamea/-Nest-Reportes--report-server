import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(private readonly printerService: PrinterService) { }

  async getOrderByIdReport(orderId: string) {
    const docDefinition = orderByIdReport();

    // creamos un documento usando el printerService mediante la inyeccion de dependencias
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
