import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home";
import Details from "../screens/Details";
import Adverts from "../screens/Adverts";
import CreateAdvert from "../screens/CreateAdvert";
import EditAdvert from "../screens/EditAdvert";
import DetailsMyAdverts from "../screens/DetailsMyAdvert";
import Preview from "../screens/Preview";

type AppRoutes ={ 
    home: undefined;
    details: undefined;
    adverts: undefined;
    createAdverts: undefined;
    editAdverts: undefined;
    detailsMyAdverts: undefined;
    preview: undefined;
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
            <Screen
                name="createAdverts"
                component={CreateAdvert}
            />
            <Screen
                name="editAdverts"
                component={EditAdvert}
            />
            <Screen
                name="detailsMyAdverts"
                component={DetailsMyAdverts}
            />
            <Screen
                name="preview"
                component={Preview}
            />
        </Navigator>
    )
}