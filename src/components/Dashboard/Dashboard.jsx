import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Button, Container } from 'react-bootstrap';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchCoinData } from "../Redux/slices/globalCoins";
import StyledCell from '../Layout/StyledCell';
import Card from '../Layout/Card';
import PromptCard from '../Layout/PromptCard';
import {  useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const user = useSelector((state) => state.userReducer.currentUser);
  const userCoin = useSelector((state) => state.userCoinsReducer[user]);
  const coinData = useSelector((state) => state.globalCoinDataReducer.data);
  const loading = useSelector((state) => state.globalCoinDataReducer.loading);
  const error = useSelector((state) => state.globalCoinDataReducer.error);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCoinData());
  }, [dispatch]);

  if (!user) {
    return <PromptCard class={"danger"} body={"Login required to visit this page."} />
  }

  if (loading) {
    return <PromptCard class={"secondary"} body={"Loading Data."} />
  }

  if (error) {
    console.log("error1:", error)
    return <PromptCard class={"danger"} body={"Error Loading data"} />
  }

  const handleTransfer = (coin, user, coinSymbol) => {
    navigate(`/transfer?user=${user}&coinSymbol=${coinSymbol}`, { coin });
 };

  const StyledTableCell = StyledCell;
  if (coinData) {
    return (
      <Card title={"User Coin Data"} maxWidth={"90%"}>
      <Container>
        <TableContainer className='mt-4' component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coin</StyledTableCell>
                <StyledTableCell>Live Rate (USD)</StyledTableCell>
                <StyledTableCell>Coins Quantity</StyledTableCell>
                  <StyledTableCell>Total Worth (USD)</StyledTableCell>
                <StyledTableCell>Transfer</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(userCoin).map((coinSymbol) => {
                const coin = coinData[coinSymbol];
                const quantity = userCoin[coinSymbol];
                const totalWorth = (coin.rate * quantity).toFixed(2);
                return (
                  <TableRow key={coin.symbol}>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <Image src={coin.icon_url} alt={coin.name_full} width={30} height={30} className="me-2" />
                        <div>
                          <div>{coin.symbol}</div>
                          <div>{coin.name_full}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{coin.rate}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>{totalWorth}</TableCell>
                    <TableCell>
                      <Button variant="primary" onClick={() =>  handleTransfer(coin, user,coinSymbol)}>
                        Transfer
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </Card>
    );
  }
};

export default Dashboard;
