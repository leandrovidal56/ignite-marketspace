import {   Button,  Row, Text  } from "native-base"
import { IconComponent } from "../icon";
import { useNavigation } from "@react-navigation/native";

type Props =  {
    back?: boolean;
    title?: string;
    showIconRight?: boolean;
    iconName?: 'edit' | 'plus';
}

export function Header({ back = false, title, iconName = 'edit', showIconRight = false }: Props){
    
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack()
    }

    return (
        <Row width={"full"} height={12} alignItems={'center'} paddingX={6} justifyContent={'center'}>
            {back ?
                <Button left={0} position={'absolute'} background={'transparent'} onPress={handleGoBack}
                    leftIcon={ <IconComponent name="arrowleft" color={'black'} size={6} />} 
                />
                : 
                ''
            }

            <Text  textAlign={'center'}  fontSize={20} fontWeight={"bold"}>{title}</Text>

            {showIconRight ?
                <Button right={0} position={'absolute'} background={'transparent'} 
                    rightIcon={
                        <IconComponent name={iconName} color={'black'} size={6} />} 
                />
                : 
                ''
            }
        </Row>
    )
}