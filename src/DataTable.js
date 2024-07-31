// src/DataTable.js

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./DataTable.css"; // Import custom CSS

const initialData = [
  { id: 1, col1: "Data 1", col2: "Value 1", category: "A" },
  { id: 2, col1: "Data 2", col2: "Value 2", category: "B" },
  { id: 3, col1: "Data 3", col2: "Value 3", category: "A" },
  // Add more data as needed
];

const DataTable = () => {
  const [data, setData] = useState(initialData);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("col1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleEdit = (id) => {
    console.log(`Edit row with id ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setData(data.filter((row) => row.id !== id));
    }
  };

  const filteredData = data.filter(
    (row) =>
      (row.col1.toLowerCase().includes(filter.toLowerCase()) ||
        row.col2.toLowerCase().includes(filter.toLowerCase())) &&
      (categoryFilter === "" || row.category === categoryFilter)
  );

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === "col1") {
      return order === "asc"
        ? a.col1.localeCompare(b.col1)
        : b.col1.localeCompare(a.col1);
    } else {
      return order === "asc"
        ? a.col2.localeCompare(b.col2)
        : b.col2.localeCompare(a.col2);
    }
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className="data-table-container">
      <div className="heading">Data Table with Edit and Delete</div>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Search"
        value={filter}
        onChange={handleFilterChange}
        className="search-field"
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="A">Category A</MenuItem>
          <MenuItem value="B">Category B</MenuItem>
        </Select>
      </FormControl>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "col1"}
                  direction={orderBy === "col1" ? order : "asc"}
                  onClick={() => handleRequestSort("col1")}
                >
                  Column 1
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "col2"}
                  direction={orderBy === "col2" ? order : "asc"}
                  onClick={() => handleRequestSort("col2")}
                >
                  Column 2
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.col1}</TableCell>
                <TableCell>{row.col2}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
