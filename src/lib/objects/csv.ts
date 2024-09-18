export type CsvFormatValueCallback = ( value: any, dataItem?: Record<string, any> ) => string;

export interface CsvColumn {
  key: string;
  title: string;
  formatValue?: CsvFormatValueCallback;
}

export const downloadCsv = (data: Record<string, any>[], columns: CsvColumn[], filename: string) => {
    const nullToEmptyReplacer = (key: string, value: any) => {
      return value === null ? "" : value;
    };
  
    const prepareDataItem = (dataItem: Record<string, any>) => {
      return columns.map((column) => {
        let value = dataItem[column.key] ?? "-";
        if (column.key in dataItem && typeof column.formatValue === "function") {
          value = column.formatValue(dataItem[column.key], dataItem);
        }
        return JSON.stringify(value, nullToEmptyReplacer);
      });
    };
  
    const headingsRow = columns.map((column) => column.title).join(",");
    const contentRows = data.map((dataItem) => prepareDataItem(dataItem).join(",")).join("\r\n");
  
    const csvDataString = [headingsRow, contentRows].join("\r\n");
    const universalBom = "\uFEFF";
    const blobParts = [universalBom + csvDataString];
    const blobOptions: BlobPropertyBag = { type: "text/csv;charset=UTF-8" };
  
    const file = new Blob(blobParts, blobOptions);
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
  
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link); // Append to the document
    link.click();
    document.body.removeChild(link); // Remove from the document
    URL.revokeObjectURL(url); // Clean up the URL
  };
  