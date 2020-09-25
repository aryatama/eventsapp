import React, { useEffect } from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './pages/LandingPage'
import EventsDetailPage from './pages/EventsDetailPage'
import EventsPage from './pages/EventsPage'
import { useDispatch, useSelector } from 'react-redux';
import { checkLanding } from './redux/actions/LandingAction';
import { getEvents } from './redux/actions/EventsAction';
import Loading from './components/Loading';

export default function Router() {

  // const isLanding = useSelector(state => state.landing.isLanding)
  const dispatch = useDispatch()

  useEffect(() => {
    StatusBar.setBackgroundColor("#E8505B")
    // dispatch(checkLanding())

  }, [])


  const mainStack = createStackNavigator()
  return (
    <>
      <NavigationContainer>
        <mainStack.Navigator screenOptions={{ headerShown: false }}>
          {/* {isLanding === true ?
          <mainStack.Screen name="LandingPage" component={LandingPage} /> :
          <>
            <mainStack.Screen name="EventsPage" component={EventsPage} />
            <mainStack.Screen name="EventsDetailPage" component={EventsDetailPage} />
          </>
        } */}

          <mainStack.Screen name="LandingPage" component={LandingPage} />
          <mainStack.Screen name="EventsPage" component={EventsPage} />
          <mainStack.Screen name="EventsDetailPage" component={EventsDetailPage} options={
            ({ route }) => ({ title: route.params.title, headerShown: true, headerStyle: { backgroundColor: "#D1D1D1" } })
          } />
        </mainStack.Navigator>
      </NavigationContainer>
      <Loading />
    </>
  )
}

