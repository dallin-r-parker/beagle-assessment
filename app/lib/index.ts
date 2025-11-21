export function parseMixedDateToDate(input: string): Date {
  const trimmed = input.trim();
  console.log('trimmed', trimmed)
  if (trimmed.includes("-")) {
    const [dayStr, monStr, yearStr] = trimmed.split("-");

    const day = parseInt(dayStr, 10);
    if (Number.isNaN(day)) throw new Error(`Invalid day: ${input}`);

    const monthMap: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const month = monthMap[monStr.trim().toLowerCase()];
    if (month === undefined) throw new Error(`Invalid month: ${input}`);

    const yy = parseInt(yearStr, 10);
    if (Number.isNaN(yy)) throw new Error(`Invalid year: ${input}`);

    const fullYear = yy >= 50 ? 1900 + yy : 2000 + yy;

    return new Date(fullYear, month, day);
  }

  if (trimmed.includes("/")) {
    const [monthStr, dayStr, yearStr] = trimmed.split("/");

    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);

    if (
      Number.isNaN(month) ||
      Number.isNaN(day) ||
      Number.isNaN(year)
    ) {
      throw new Error(`Invalid numeric date: ${input}`);
    }

    return new Date(year, month - 1, day);
  }

  // throw new Error(`Unrecognized date format: ${input}`);
}