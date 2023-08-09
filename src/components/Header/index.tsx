import {   Button,  Row, Text  } from "native-base"
import { IconComponent } from "../icon";
import { useNavigation } from "@react-navigation/native";

type Props =  {
    back?: boolean;
    title?: string;
    showIconRight?: boolean;
    iconLeftName?: 'edit' | 'plus';
    navigationIconRight?: () => void;
    
}

export function Header({ 
    back = false, title, 
    iconLeftName = 'edit', 
    showIconRight = false, navigationIconRight
 }: Props){    
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack()
    }

    return (
        <Row width={"full"} paddingX={6} 
            height={12} alignItems={'center'} justifyContent={'center'}>
            {back ?
                <Button left={4} position={'absolute'} background={'transparent'} onPress={handleGoBack}
                    leftIcon={ <IconComponent name="arrowleft" color={'black'} size={6} />} 
                />
                : 
                ''
            }
            <Text  textAlign={'center'}  fontSize={20} fontWeight={"bold"}>{title}</Text>
            {showIconRight ?
                <Button right={0} position={'absolute'} background={'transparent'} onPress={navigationIconRight}
                    rightIcon={
                        <IconComponent name={iconLeftName} color={'black'} size={6} />} 
                />
                : 
                ''
            }
        </Row>
    )
}