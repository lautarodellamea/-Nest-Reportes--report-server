import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],

  // importo el modulo
  imports: [PrinterModule],
})
export class BasicReportsModule { }
