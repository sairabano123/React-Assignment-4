import React, { useState } from 'react';
import PromptCard from '../Layout/PromptCard';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Layout/Card';
import { Button, FloatingLabel, Form, Stack } from 'react-bootstrap';
import { updateUserCoins } from '../Redux/slices/userCoins';

const TransferForm = () => {

  const coinData = useSelector((state) => state.globalCoinDataReducer.data);
  let userCoin = useSelector((state) => state.userCoinsReducer);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get("user");
  let coinSymbol = searchParams.get("coinSymbol");

  const handleTransfer = (e) => {
    e.preventDefault()
    console.log('Transfer initiated.');
    dispatch(updateUserCoins({ user: user, currency: e.target.coinChain.value }));

    setMsg(<PromptCard class={"primary"} body={"Coins transferred."} />)
    setTimeout(() => { navigate('/dashboard'); }, 1500);
  };

  const handleCoinChange = (e) => {
    coinSymbol = e.target.value;
    searchParams.set('coinSymbol', coinSymbol);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  if (!user || !coinSymbol || !coinData) {
    return <PromptCard class={"danger"} body={"Login required to visit this page."} />
  }

  if (coinData) {
    userCoin = userCoin[user];
    return (
      <>
        <Card title={
          <>
            Transfer {coinSymbol}{' '}
            {coinData[coinSymbol] && (
              <img
                src={coinData[coinSymbol].icon_url}
                alt=""
                style={{ width: '24px', height: '24px' }}
              />
            )}
          </>
        } maxWidth={"50%"}>
          <Form className="text-dark" onSubmit={handleTransfer}>
            <Stack>
              <Form.Group>
                <FloatingLabel
                  controlId="transferAddress"
                  label="Transfer Address"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="" required />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel controlId="coinChain" label="Coin Chain">
                  <Form.Control as="select" value={coinSymbol} onChange={handleCoinChange} >
                    {Object.keys(userCoin).map((coinSymbol) => {
                      return (
                        <option key={coinSymbol} value={coinSymbol}>{coinData[coinSymbol].name_full}</option>
                      );
                    })}
                  </Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Button className="mt-2" type="submit" variant="primary">Transfer</Button>
            </Stack>
          </Form>
        </Card>
        {msg}
      </>
    );
  }
};

export default TransferForm;
