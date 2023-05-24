import { Center, Heading, Text, VStack, ScrollView, Avatar, Row, Column, SimpleGrid} from 'native-base';

import LogoSvg from '@assets/Logo.svg'
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxSale } from '../../components/boxSale';
export default function Home (){
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} padding={6}>
            <Center mt={16} justifyContent={'space-between'} height={42} flexDirection={'row'}>
                <Row alignItems={'center'}>
                    <Avatar/>
                    <Column ml={4}>
                        <Text>Boas Vindas,</Text>
                        <Heading>Maria!</Heading>
                    </Column>
                </Row>
                <Button
                    background={'black'}
                    title='Criar anúncio'
                    width={139}
                />
            </Center>
            <VStack mt={8}>
                <Text>Seus produtos anunciados para venda</Text>
                <Row mt={4} alignItems={'center'} justifyContent={'space-between'} padding={4} background={'blue.100'}>
                    <Row  alignItems={'center'}>
                        <Heading>4</Heading>
                        <Column ml={4}>
                            <Heading>4</Heading>
                            <Text>anúncios ativos</Text>
                        </Column>
                    </Row>
                    <Text>Meus anúncios -></Text>
                </Row>
                    <Text mt={8}>Compre produtos variados</Text>
                    <Input 
                        placeholder='Buscar anúncio'
                    />
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelhor'
                            price={59.90}
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelhor'
                            price={59.90}
                        />
                    </Row>
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelhor'
                            price={59.90}
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelhor'
                            price={59.90}
                        />
                    </Row>
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelhor'
                            price={59.90}
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelhor'
                            price={59.90}
                        />
                    </Row>
            </VStack>

        </ScrollView>
    );
}