import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterByIdReport, getEmploymentLetterReport, getHelloWorldReport } from 'src/reports';

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

  // pdf con datos del empleado
  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) throw new NotFoundException('Empleado no encontrado');

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Lautaro Della Mea',
      employerPosition: 'Gerente de Tucan Code Corp.',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });

    // creamos un documento usando el printerService mediante la inyeccion de dependencias
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
