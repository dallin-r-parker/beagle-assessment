import { ChangeEvent, useState } from "react";

type UploadCsvProps = {
  onFileSelected?: (file: File) => void;
  onError?: (message: string) => void;
  label?: string;
};

const UploadCsv: React.FC<UploadCsvProps> = ({
  onFileSelected,
  onError,
  label,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setErrorMessage = (message: string) => {
    setError(message);
    onError?.(message);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setFileName(null);
      return;
    }

    const isCsvType = file.type === "text/csv";
    const isCsvExt = file.name.toLowerCase().endsWith(".csv");
    const isXlsxType = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isXlsxExt = file.name.toLowerCase().endsWith(".xlsx");

    if (!isCsvType && !isCsvExt && !isXlsxType && !isXlsxExt) {
      setFileName(null);
      setErrorMessage("Please select a valid .csv or .xlsx file.");
      return;
    }

    setFileName(file.name);
    onFileSelected?.(file);
  };

  return (
    <div>
      <label>
        {label ?? "Upload CSV or XLSX"}
        <input
          type="file"
          accept=".csv,text/csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileChange}
          style={{ display: "block", marginTop: 8 }}
        />
      </label>

      {fileName && <div>Selected file: {fileName}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default UploadCsv;