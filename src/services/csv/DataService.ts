import Papa from 'papaparse';
import Transaction from '../../types/Transaction';
import {lineDataItem} from 'react-native-gifted-charts';
import CSVCheckingData from './CSVCheckingData';
import CSVSavingsData from './CSVSavingsData';
import CSVCreditData from './CSVCreditData';

export const getData = async (
  type: 'checking' | 'savings' | 'credit',
): Promise<Array<Transaction>> => {
  let dataString = '';
  switch (type) {
    case 'checking':
      dataString = CSVCheckingData;
      break;
    case 'savings':
      dataString = CSVSavingsData;
      break;
    case 'credit':
      dataString = CSVCreditData;
      break;
  }
  return new Promise((resolve, reject) => {
    Papa.parse(dataString, {
      complete: (results: any) => {
        const headers = results.data[0];
        let jsonData: Array<any> = [];
        results.data.forEach((row: any, rowIndex: number) => {
          if (rowIndex === 0) {
            return;
          }
          if (!jsonData[rowIndex - 1]) {
            jsonData[rowIndex - 1] = {};
          }
          row.forEach((cell: any, cellIndex: number) => {
            if (cellIndex === 6 || cellIndex === 7) {
              return;
            }
            let headerName = headers[cellIndex];
            if (type === 'credit') {
              if (headerName === 'Post Date') {
                headerName = 'Posting Date';
              }
            }
            jsonData[rowIndex - 1][headerName] = cell;
          });
        });
        resolve(jsonData as Array<Transaction>);
      },
    });
  });
};

export const getAllData = async (): Promise<Array<Transaction>> => {
  const checkingData = await getData('checking');
  const savingsData = await getData('savings');
  const creditData = await getData('credit');
  return checkingData.concat(savingsData).concat(creditData);
};

export const getNetWorthData = async (): Promise<Array<lineDataItem>> => {
  return getAllData().then((transactions: Array<Transaction>) => {
    return transactions
      .filter((item: Transaction) => item.Type === 'DEBIT_CARD')
      .map((item: Transaction) => ({
        label: item['Posting Date'].slice(0, 5),
        value: item.Balance !== '' ? Number(item.Balance) * 1000 : 0,
      }))
      .reduce((acc: Array<lineDataItem>, item: lineDataItem) => {
        if (acc.length === 0) {
          return [item];
        }
        const lastItem = acc[acc.length - 1];
        if (lastItem.label === item.label) {
          return acc;
        }
        return [...acc, item];
      }, []);
  });
};
