import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Details from "../screens/Details";
import Adverts from "../screens/Adverts";
import CreateAdvert from "../screens/CreateAdvert";
import EditAdvert from "../screens/EditAdvert";
import DetailsMyAdverts from "../screens/DetailsMyAdvert";
import Preview from "../screens/Preview";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

type AppRoutes ={ 
    home: undefined;
    details: undefined;
    adverts: undefined;
    createAdverts: undefined;
    editAdverts: undefined;
    detailsMyAdverts: undefined;
    preview: undefined;
    logout: undefined;
    signIn: undefined;
    signUp: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const Stack = createNativeStackNavigator();

export function AppRoutes(){
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
             <Stack.Screen
                name="signIn"
                component={SignIn}
            />
            <Stack.Screen
                name="signUp"
                component={SignUp}
            />
         
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