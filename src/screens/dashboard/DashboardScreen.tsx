import React, {useEffect, useState} from 'react';
import {getData, getNetWorthData} from '../../services/csv/DataService';
import FLineChart from '../../components/line-chart/FLineChart';
import {View} from 'react-native';
import Transaction from '../../types/Transaction';
import {lineDataItem} from 'react-native-gifted-charts';

const DashboardScreen = () => {
  const [data, setData] = useState([] as Array<lineDataItem>);

  useEffect(() => {
    getNetWorthData().then((lineData: Array<lineDataItem>) => {
      console.warn(lineData);
      setData(lineData);
    });
  }, []);

  return (
    <View>
      <FLineChart data={data} />
    </View>
  );
};

export default DashboardScreen;
