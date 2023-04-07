import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function PresentData({ rows, onDelete }:{rows: any[], onDelete: (id: string) => void}) {
  return (
    <TableContainer sx={{ maxWidth: 450
    }} component={Paper}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Chocolate</TableCell>
            <TableCell align="left">Chips</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.chocolate}</TableCell>
              <TableCell align="left">{row.chips}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onDelete(row.id)} color="warning"><Delete /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}