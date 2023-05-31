import { Center, Heading, Text, VStack, ScrollView, Avatar, Row, Column, SimpleGrid, Box, Icon} from 'native-base';

import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxSale } from '../../components/boxSale';
export default function Details (){
    return (
        <VStack justifyContent={'center'} paddingTop={12}>
            <Center>
                <Box width={373} height={280} bgColor={'blue.900'}/>
            </Center>
            <VStack padding={6} bgColor={"#EDECEE"}>

                <Row alignItems={'center'} >
                    <Avatar size={6} mr={2}/>
                    <Text>Markenna Baptista</Text>
                </Row>
                <Box width={43} height={17} borderRadius={20} bgColor={'gray.300'} mt={6} alignItems={'center'} justifyContent={'center'}>
                    <Text fontSize={10} >NOVO</Text>
                </Box>
                <Row justifyContent={'space-between'} mt={2}>
                    <Text fontSize={20} fontWeight={'semibold'}>Bicicleta</Text>
                    <Text color={"#647ac7"}  fontWeight={'bold'} fontSize={20} >R$ 120,00</Text>
                </Row>
                <Text fontWeight={'normal'} fontSize={14} lineHeight={18.2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis voluptas accusantium, delectus eius fugit enim, debitis dolor cumque eveniet consequatur soluta distinctio maxime libero. Nobis asperiores doloremque saepe eius velit.</Text>
                <Row mt={6}>
                    <Text fontSize={14} lineHeight={18} fontWeight={'bold'}>Aceitar troca?</Text>
                    <Text ml={2}>Sim</Text>
                </Row>
                <Column>
                    <Text>Meios de pagamento:</Text>
                    <Row mt={2}>
                        <Icon size={18} bgColor={'blue.600'} mr={2}/>
                        <Text>Boleto</Text>
                    </Row>
                    <Row>
                        <Icon size={18} bgColor={'blue.600'} mr={2}/>
                        <Text>Pix</Text>
                    </Row>
                    <Row>
                        <Icon size={18} bgColor={'blue.600'} mr={2}/>
                        <Text>Dinheiro</Text>
                    </Row>
                    <Row>
                        <Icon size={18} bgColor={'blue.600'} mr={2}/>        
                        <Text>Cartão de Crédito</Text>
                    </Row>
                    <Row>
                        <Icon size={18} bgColor={'blue.600'} mr={2}/>
                        <Text>Depósito Bancário</Text>
                    </Row>
                </Column>
            </VStack>
            <VStack padding={6}>
                <Row justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={24} color={"#364d9d"} fontWeight={'bold'}>
                        <Text fontSize={12}>R$</Text>
                        120,00
                    </Text>
                    <Button 
                        title='Entrar em Contato'
                        width={169}
                        height={42}
                    />
                </Row>
            </VStack>

        </VStack>
    );
}