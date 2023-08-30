import { type BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { type ProductDetailsDTO } from '../dtos/productDetailsDTO'
import Adverts from '../screens/Adverts'
import CreateAdvert from '../screens/CreateAdvert'
import Details from '../screens/Details'
import DetailsMyAdverts from '../screens/DetailsMyAdvert'
import EditAdvert from '../screens/EditAdvert'
import Home from '../screens/Home'
import Preview from '../screens/Preview'

interface AppRoutes {
  home: undefined
  details: { productId: string }
  adverts: undefined
  createAdverts: undefined
  editAdverts: { data: ProductDetailsDTO }
  detailsMyAdverts: { productId: string }
  preview: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

const Stack = createNativeStackNavigator()

export function AppRoutes () {
  return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="home"
                component={Home}
            />

            <Stack.Screen
                name="details"
                component={Details}
            />

            <Stack.Screen
                name="adverts"
                component={Adverts}
            />

            <Stack.Screen
                name="createAdverts"
                component={CreateAdvert}
            />

            <Stack.Screen
                name="editAdverts"
                component={EditAdvert}
            />

            <Stack.Screen
                name="detailsMyAdverts"
                component={DetailsMyAdverts}
            />

            <Stack.Screen
                name="preview"
                component={Preview}
            />

        </Stack.Navigator>
  )
}
