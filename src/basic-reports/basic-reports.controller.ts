import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get()
  async hello(@Res() response: Response) {
    // return await this.basicReportsService.hello();
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    // return await this.basicReportsService.hello();
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Carta de empleo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  // pdf con datos del empleado
  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    // return await this.basicReportsService.hello();
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Carta de empleo con datos del empleado';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  // Listado de paises (tabla)
  @Get('countries')
  async countriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.countryReport();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
