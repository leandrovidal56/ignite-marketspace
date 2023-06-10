import {   Box, Center,  Checkbox,  Row, Switch, Text, VStack, View  } from "native-base"
import { IconComponent } from "../icon";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Header } from "../Header";
import { Button } from "../button";

type Props =  {
    // onOpen: () => void
}

export function Modal({   }: Props){
    const modalizeRef = useRef<Modalize>(null);

    

    return (
        <View 
            display={'flex'}
            background={'blue.500'}
            alignItems={'flex-end'}
            justifyContent={'flex-end'}
            height={980} 
            width={390} 
            position={'absolute'} 
        >
            <VStack  
                background={'#EDECEE'} 
                position={'absolute'} 
                height={750} 
                width={390} 
                paddingX={6}
                borderRadius={6}
                >
                <Row 
                    justifyContent={'space-between'}
                    height={7} 
                    >
                    <Text fontWeight={'bold'} fontSize={20} lineHeight={26}>Filtrar anúncios</Text>
                    <IconComponent name="close" size={6} color={'black'}/>
                </Row>
                    <Text fontSize={14} fontWeight={"bold"} mt={6}>Condição</Text>
                <Row>
                    <Box width={76} height={28} borderRadius={20} bgColor={'gray.300'} mt={3} mb={6} mr={2} alignItems={'center'} justifyContent={'center'}>
                        <Text fontSize={10} >NOVO</Text>
                    </Box>
                    <Box width={76} height={28} borderRadius={20} bgColor={'gray.300'} mt={3} mb={6} mr={2} alignItems={'center'} justifyContent={'center'}>
                        <Text fontSize={10} >USADO</Text>
                    </Box>
                </Row>
                <Text fontSize={14} fontWeight={"bold"}>Aceita troca ?</Text>
                <Switch size="md" mt={3} mb={6} />
                <Text fontSize={14} fontWeight={"bold"}>Meios de pagamento aceitos</Text>
                <Checkbox mt={3}
                    value="boleto"
                    >
                    Boleto
                </Checkbox>
                <Checkbox mt={3}
                    value="pix"
                    >
                    Pix
                </Checkbox>
                <Checkbox mt={3}
                    value="dinheiro"
                    >
                    Dinheiro
                </Checkbox>
                <Checkbox mt={3}
                    value="cartao de credito"
                    >
                    Cartão de Crédito
                </Checkbox>
                <Checkbox mt={3}
                    value="deposito bancario"
                    >
                    Depósito Bancário
                </Checkbox>
                <Row justifyContent={'space-between'} mt={65}>
                    <Button 
                        title="Resetar filtros"
                        backgroundColor={'#D9D8DA'}
                        width={157}
                        variant={'outline'}
                    />
                    <Button 
                        title="Aplicar filtros"
                        backgroundColor={'#1A181B'}
                        width={157}
                    />
                </Row>
            </VStack>
            
        </View>
    )
}