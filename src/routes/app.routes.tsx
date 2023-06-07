import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home";
import Details from "../screens/Details";
import Adverts from "../screens/Adverts";

type AppRoutes ={ 
    home: undefined;
    details: undefined;
    adverts: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="details"
                component={Details}
            />
            <Screen
                name="adverts"
                component={Adverts}
            />
        </Navigator>
    )
}