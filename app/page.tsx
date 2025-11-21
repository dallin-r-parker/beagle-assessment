"use client";

import { useMemo, useState } from "react";
import UploadCsv from "./components/UploadCsv";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TableSortLabel,
} from "@mui/material";
import { fmtDate } from "./lib";

type TransactionRecord = {
  account: string;
  accountDescription: string;
  enteredDate: Date;
  effectiveDate: Date;
  memo: string;
  source: string;
  transaction: string;
  debit: string;
  credit: string;
  type: string | null;
};

type SortKey = keyof TransactionRecord;

const Page = () => {
  const [records, setRecords] = useState<TransactionRecord[]>([]);
  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleFileSelected = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);


    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (Array.isArray(data.records)) {
      setRecords(data.records);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const sortedRecords = useMemo(() => {
    if (!sortBy) return records;

    const multiplier = sortDir === "asc" ? 1 : -1;

    return [...records].sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];

      if (sortBy === "enteredDate" || sortBy === "effectiveDate") {
        const ta = va ? new Date(va as Date).getTime() : 0;
        const tb = vb ? new Date(vb as Date).getTime() : 0;
        return (ta - tb) * multiplier;
      }

      if (sortBy === "debit" || sortBy === "credit") {
        const na = parseFloat((va as string) || "0");
        const nb = parseFloat((vb as string) || "0");
        return (na - nb) * multiplier;
      }

      const sa = (va ?? "").toString();
      const sb = (vb ?? "").toString();
      return sa.localeCompare(sb) * multiplier;
    });
  }, [records, sortBy, sortDir]);

  return (
    <main>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upload General Ledger CSV
        </Typography>
        <UploadCsv onFileSelected={handleFileSelected} />

        {records.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Uploaded Transactions ({records.length})
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sortDirection={sortBy === "account" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "account"}
                        direction={sortBy === "account" ? sortDir : "asc"}
                        onClick={() => handleSort("account")}
                      >
                        Account
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "accountDescription" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "accountDescription"}
                        direction={sortBy === "accountDescription" ? sortDir : "asc"}
                        onClick={() => handleSort("accountDescription")}
                      >
                        Account Description
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "enteredDate" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "enteredDate"}
                        direction={sortBy === "enteredDate" ? sortDir : "asc"}
                        onClick={() => handleSort("enteredDate")}
                      >
                        Entered Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "effectiveDate" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "effectiveDate"}
                        direction={sortBy === "effectiveDate" ? sortDir : "asc"}
                        onClick={() => handleSort("effectiveDate")}
                      >
                        Effective Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "memo" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "memo"}
                        direction={sortBy === "memo" ? sortDir : "asc"}
                        onClick={() => handleSort("memo")}
                      >
                        Memo
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "source" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "source"}
                        direction={sortBy === "source" ? sortDir : "asc"}
                        onClick={() => handleSort("source")}
                      >
                        Source
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "transaction" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "transaction"}
                        direction={sortBy === "transaction" ? sortDir : "asc"}
                        onClick={() => handleSort("transaction")}
                      >
                        Transaction
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sortDirection={sortBy === "debit" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "debit"}
                        direction={sortBy === "debit" ? sortDir : "asc"}
                        onClick={() => handleSort("debit")}
                      >
                        Debit
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" sortDirection={sortBy === "credit" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "credit"}
                        direction={sortBy === "credit" ? sortDir : "asc"}
                        onClick={() => handleSort("credit")}
                      >
                        Credit
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sortDirection={sortBy === "type" ? sortDir : false}>
                      <TableSortLabel
                        active={sortBy === "type"}
                        direction={sortBy === "type" ? sortDir : "asc"}
                        onClick={() => handleSort("type")}
                      >
                        Type
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRecords.map((row, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{row.account}</TableCell>
                      <TableCell>{row.accountDescription}</TableCell>
                      <TableCell>{fmtDate(row.enteredDate)}</TableCell>
                      <TableCell>{fmtDate(row.effectiveDate)}</TableCell>
                      <TableCell>{row.memo}</TableCell>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.transaction}</TableCell>
                      <TableCell align="right">{row.debit}</TableCell>
                      <TableCell align="right">{row.credit}</TableCell>
                      <TableCell>{row.type ?? ""}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </main>
  );
};

export default Page;