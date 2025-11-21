const excelEpoc = new Date(1900, 0, -1).getTime();
const msDay = 86400000;

export function excelDateToJavascript(excelDate: number) {
  return  new Date(excelEpoc + excelDate * msDay)
}

export function fmtDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}