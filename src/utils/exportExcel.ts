import * as XLSX from "xlsx";

export const exportToExcel = (data: any[], fileName: string) => {
  if (!data || data.length === 0) {
    console.warn("Nenhum dado disponível para exportação.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
