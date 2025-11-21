"use client";

import { useState } from "react";
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

const Page = () => {
  const [records, setRecords] = useState<TransactionRecord[]>([]);

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
                    <TableCell>Account</TableCell>
                    <TableCell>Account Description</TableCell>
                    <TableCell>Entered Date</TableCell>
                    <TableCell>Effective Date</TableCell>
                    <TableCell>Memo</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Transaction</TableCell>
                    <TableCell align="right">Debit</TableCell>
                    <TableCell align="right">Credit</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((row, idx) => (
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