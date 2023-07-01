import { NavigationContainer } from "@react-navigation/native";


import { useAuth } from "../hookes/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes(){
    const { user } = useAuth();
    console.log('take context data', user)

    return (
        <NavigationContainer>
            {user.id ? <AppRoutes/> : <AuthRoutes/> }
        </NavigationContainer>
    )
}