"use client";
import React, {
  useLayoutEffect,
  createContext,
  useState,
  useEffect,
} from "react";
import { redirect } from "next/navigation";
// MUI Components
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Custom CSS
import adminStyle from "../styles/admin.module.css";
import Navbar from "@/components/Navbar";
import { HandleGetStudents } from "../services/studentService";
import { capitalizeFirstLetter } from "@/common/capitalizFirstLetter";
import SpinnerProgress from "@/common/spinnerPgress";
import { usePagination } from "@/common/pagination";

interface Column {
  id: "name" | "college" | "batch" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "STUDENT AME", minWidth: 170 },
  { id: "college", label: "COLLEGE", minWidth: 100 },
  { id: "batch", label: "STUDENT BATCH", minWidth: 100 },
  { id: "status", label: "STATUS", minWidth: 100 },
];

export default function Admin() {
  const [rows, setRows] = useState<any>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  let [page, setPage] = React.useState<any>(1);
  const [row_per_page, set_row_per_page] = React.useState(10);
  const PER_PAGE = row_per_page;
  const DATA = usePagination(rows, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  useEffect(() => {
    getAllStudentsData();
  }, []);

  const getAllStudentsData = () => {
    HandleGetStudents()
      .then((students) => {
        setLoading(false);
        setRows(students.data);
        console.log(students.data, "tttttt");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleStudents = () => {
    console.log("sssssssssss");
  };


  const handleSort = (rowsData: any) => {};

  return (
    <>
      {/* navigation bar component */}
      <Navbar />
      <Box className={adminStyle.mainStyles}>
       
          <Button size="medium" variant="contained" onClick={handleStudents}>
            List Of Students
          </Button>

          <Card>
            <CardContent>
              <Paper>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    {/* table head */}
                    <TableHead>
                      <TableRow>
                        {columns?.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ top: 0, minWidth: column.minWidth }}
                            onClick={() => {
                              column.label === "ID" ? handleSort(rows) : "";
                            }}
                            
                          >
                            {column.label === "ID" ? <></> : column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {/* table body */}

                    <TableBody>
                      {!loading ? (
                        rows && rows.length > 0 ? (
                          DATA.currentData() &&
                          DATA.currentData().map((row: any) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row._id}
                              >
                                <TableCell>
                                  {capitalizeFirstLetter(row?.student_name)}
                                </TableCell>

                                <TableCell>
                                  {capitalizeFirstLetter(row?.college)}
                                </TableCell>

                                <TableCell>
                                  {row?.batch}
                                </TableCell>

                                <TableCell>
                                  {row?.status == 0 ? 'Not Placed' : 'Placed'}
                                </TableCell>

                               
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                           
                              sx={{ fontWeight: 600 }}
                            >
                              {" "}
                              Record not found{" "}
                            </TableCell>
                          </TableRow>
                        )
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                          
                          >
                            <SpinnerProgress />{" "}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </CardContent>
          </Card>
      

      </Box>

      
    </>
  );
}
