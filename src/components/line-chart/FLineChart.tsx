import React from 'react';
import {View} from 'react-native';
import {LineChart, LineChartPropsType} from 'react-native-gifted-charts';
import {Text} from 'react-native-ui-lib';
import Theme from '../../constants/Theme';

const FLineChart = (props: LineChartPropsType) => {
  return (
    <View style={{flex: 1}}>
      <LineChart
        areaChart={true}
        isAnimated={true}
        animationDuration={1200}
        initialSpacing={0}
        thickness={5}
        spacing={30}
        color={Theme.primary}
        startFillColor={Theme.primary}
        noOfSections={5}
        adjustToWidth={true}
        pointerConfig={{
          pointerColor: Theme.secondary,
          pointerLabelComponent: (items: any) => {
            return (
              <View
                style={{
                  height: 90,
                  width: 120,
                  justifyContent: 'center',
                  marginTop: -30,
                  marginLeft: -40,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    marginBottom: 6,
                    textAlign: 'center',
                  }}>
                  {items[0].date}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor: 'white',
                  }}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                    {'$' + items[0].value.toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          },
        }}
        hideRules={true}
        hideDataPoints={true}
        curved={true}
        {...props}
      />
    </View>
  );
};

export default FLineChart;
