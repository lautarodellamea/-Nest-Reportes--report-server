import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  console.log(currentPage, pageCount, pageSize);

  return {
    text: `Página ${currentPage} de ${pageCount} `,
    alignment: 'right',
    fontSize: 12,
    bold: true,
    margin: [0, 10, 10, 0],
  };
};
