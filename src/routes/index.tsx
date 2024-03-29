import { NavigationContainer } from "@react-navigation/native";


import { useAuth } from "../hooks/useAuth";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/loading";

export function Routes(){
    const { user, isLoadingUserStorageData } = useAuth();

    if(isLoadingUserStorageData){
        return <Loading/>
    }

    return (
        <NavigationContainer>
            {user.id ? <AppRoutes/> : <AuthRoutes/> }
        </NavigationContainer>
    )
}