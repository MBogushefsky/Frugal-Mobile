import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import SpendingScreen from './src/screens/spending/SpendingScreen';
import SavingsScreen from './src/screens/savings/SavingsScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Import your screen components here
// import Screen1 from './screens/Screen1';
// import Screen2 from './screens/Screen2';
// import Screen3 from './screens/Screen3';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Dashboard') {
            return <Ionicon name={'home'} size={size} color={color} />;
          }
          if (route.name === 'Spending') {
            return <Ionicon name={'card'} size={size} color={color} />;
          }
          if (route.name === 'Savings') {
            return <Ionicon name={'cash'} size={size} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Spending"
        component={SpendingScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Savings"
        component={SavingsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="Screen3" component={DashboardScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
