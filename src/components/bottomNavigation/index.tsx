import { Row } from "native-base";
import { IconComponent } from "../icon";
import {  MaterialIcons  } from '@expo/vector-icons'
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { useNavigation } from "@react-navigation/native";

export function BottomNavigation(){
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleGoHome(){
        navigation.navigate('home')
    }

    function handleGoDetais(){
        navigation.navigate('details')
    }

    function handleLogout(){
        console.log('logged out')
    }

    return (
        <Row 
            bgColor={'#F7F7F8'} 
            height={20} 
            paddingX={12} 
            width={'full'} 
            paddingBottom={7} 
            bottom={0} 
            position={'absolute'} 
            alignItems={'center'} 
            justifyContent={'space-between'}>
            <IconComponent name="home" familyIcon={MaterialIcons} size={7} onPress={handleGoHome} />
            <IconComponent name="tag"  size={7} onPress={handleGoDetais} />
            <IconComponent name="logout"  familyIcon={MaterialIcons} size={7} onPress={handleLogout} />
        </Row>
    )
}