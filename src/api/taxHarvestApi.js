import { capitalGainsResponse, holdingsResponse } from "./mockData";

const MOCK_DELAY = 500;

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const fetchHoldings = async () => {
  await delay(MOCK_DELAY);
  return holdingsResponse;
};

export const fetchCapitalGains = async () => {
  await delay(MOCK_DELAY);
  return capitalGainsResponse.capitalGains;
};
