import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddEnseignant from '../screens/AddEnseignant';
import EditEnseignant from '../screens/EditEnseignant';
import Stats from '../screens/Stats';
import StatsChartScreen from '../screens/StatsChartScreen';
import StatsPieChartScreen from '../screens/StatsPieChartScreen.PieChartScreen';
export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Edit: {
    enseignant: {
      matricule: string;
      nom: string;
      tauxHoraire: number;
      nbHeures: number;
    };
  };
  Stats: undefined;
  StatsChart: undefined;
  StatsPieChart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddEnseignant} />
        <Stack.Screen name="Edit" component={EditEnseignant} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="StatsChart" component={StatsChartScreen} options={{ title: 'Histogramme' }} />
        <Stack.Screen name="StatsPieChart" component={StatsPieChartScreen} options={{ title: 'Camembert' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
