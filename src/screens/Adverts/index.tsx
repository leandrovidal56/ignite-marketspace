import { Center, Heading, Text, VStack, ScrollView, Avatar, Row, Column, SimpleGrid, Box, Icon, List} from 'native-base';

import { BoxSale } from '../../components/boxSale';
export default function Adverts (){
    return (
        <VStack flex={1} mt={9} padding={6}> 
            <Row alignItems={'center'} justifyContent={'space-evenly'} mb={10}>
                <Text fontSize={20} fontWeight={700}>Meus anúncios</Text>
                <Text fontSize={20} fontWeight={700}>+</Text>
            </Row>
            <Row justifyContent={'space-between'} mb={5}>
                <Text>9 anúncios</Text>
                <Box width={111} height={34} bgColor={'red.500'}></Box>
            </Row>
            <Row justifyContent={'space-between'}>
                <BoxSale 
                    price={45}
                    title='Luminária pendente'
                    type='novo'
                />
                <BoxSale 
                    price={80}
                    title='Coturno feminino'
                    type='novo'
                />
            </Row>
            <Row justifyContent={'space-between'}>
                <BoxSale 
                    price={59}
                    title='Tênis vermelho'
                    type='usado'
                />
                <BoxSale 
                    price={80}
                    title='Tênis vermelho'
                    type='usado'
                />
            </Row>
             
        </VStack>
    );
}