import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicChartSvgReport, getHelloWorldReport, getStatisticsReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReport(orderId: number) {
    // buscamos la orden en la base de datos con las relaciones respectivas
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      // relacion
      include: {
        customers: true, // incluimos todo lo que esta en la tabla customers, sino con select seleccionamo que traer de customers
        order_details: {
          include: {
            products: true,
          },
        }, // lo mismo para el order_details
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    // console.log(JSON.stringify(order, null, 2));

    const docDefinition = orderByIdReport({
      data: order as any,
    });

    // creamos un documento usando el printerService mediante la inyeccion de dependencias
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getSvgChart() {
    const docDefinition = await getBasicChartSvgReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getStatistics() {
    const topCoutries = await this.customers.groupBy({
      by: ['country'],
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    // mapeamos la data para enviarla de la forma que la esperamos
    const topCoutryData = topCoutries.map((c) => ({
      contry: c.country,
      customers: c._count.country,
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCoutryData,
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
