import { Controller, Get, Res } from '@nestjs/common';
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
}
