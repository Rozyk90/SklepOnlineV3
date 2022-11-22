import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

import { setModal } from "../../../../../redux/slices/modals";
import { setDetailsId } from "../../../../../redux/slices/products";
import { accRatingAdd } from "../../../../../redux/slices/usersList";
import { addRating } from "../../../../../redux/slices/products";

const TableComponent = ({ list }) => {
  const userId = useSelector((state) => state.userId);
  const ratedIds = useSelector(
    (state) => state.usersList[userId].ratings.ratedIds
  );
  const userRatings = useSelector(
    (state) => state.usersList[userId].ratings.ratings
  );
  const productsList = useSelector((state) => state.products.productsList);
  const dispatch = useDispatch();

  const getThisRating = (id) => {
    const result = userRatings.find((item) => item.id === id);
    return result.value;
  };

  const showDetails = (id) => {
    dispatch(setModal({ modalName: "itemModal" }));
    dispatch(setDetailsId({ id: id }));
  };

  return (
    <TableContainer sx={{ boxShadow: 5 }} component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Nazwa</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Twoja ocena
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Ilość
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Aktualna cena
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map(({ id, value }) => {
            const item = productsList[id];

            return (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    sx={{cursor:'pointer'}}
                    color="inherit"
                    underline="hover"
                    onClick={() => {
                      showDetails(id);
                    }}
                  >
                    {item.title}
                  </Link>
                </TableCell>

                <TableCell align="right">
                  {ratedIds.includes(id) ? (
                    <Rating value={getThisRating(id)} readOnly size="small" />
                  ) : (
                    <Rating
                      name="simple-controlled"
                      size="small"
                      value={0}
                      onChange={(event, newValue) => {
                        dispatch(
                          accRatingAdd({
                            itemId: id,
                            userId,
                            value: newValue,
                          })
                        );
                        dispatch(addRating({ itemId: id, value: newValue }));
                      }}
                    />
                  )}
                </TableCell>

                <TableCell align="right">{value}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableComponent;
