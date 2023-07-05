import { createNativeStackNavigator } from "@react-navigation/native-stack" 
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";


type AuthRoutes = {
    signIn: undefined;
    signUp: undefined;
}

export type AuthNavigatorRoutesProps = BottomTabNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
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
        </Stack.Navigator>
    )
}