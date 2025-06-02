import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { name } = options;

  // definimos el documento
  const docDefinition: TDocumentDefinitions = {
    content: [`Hola ${name}`],
  };

  return docDefinition;
};
