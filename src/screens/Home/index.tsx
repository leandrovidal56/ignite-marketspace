import { Center, Heading, Text, VStack, ScrollView, Avatar, Row, Column, Divider} from 'native-base';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxSale } from '../../components/boxSale';
import { IconComponent } from '../../components/icon';

export default function Home (){
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} padding={6} background={'#EDECEE'}>
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
                    iconName='plus'
                    iconColor='#F7F7F8'
                />
            </Center>
            <VStack mt={8}>
                <Text>Seus produtos anunciados para venda</Text>
                <Row mt={4} alignItems={'center'} justifyContent={'space-between'} padding={4} background={'blue.100'}>
                    <Row  alignItems={'center'}>
                        <IconComponent
                            name="tag"
                            size={5}
                            color="#364D9D"
                        />
                        <Column ml={4}>
                            <Heading>4</Heading>
                            <Text>anúncios ativos</Text>
                        </Column>
                    </Row>
                    <Row alignItems={'center'}>
                        <Text>Meus anúncios</Text>
                        <IconComponent
                            name="arrowright"
                            size={4}
                            color="#364D9D"
                            ml={2}
                        />
                    </Row>
                </Row>
                    <Text mt={8}>Compre produtos variados</Text>
                    <Input 
                        rightElement={
                            <Row alignItems={'center'}>
                                <IconComponent
                                    name="search1"
                                    size={5}
                                    color="#1E1E1E"
                                    mr={3}
                                />
                                <Divider width={0.5} height={8} />
                                <IconComponent
                                    name="filter"
                                    size={5}
                                    color="#1E1E1E"
                                    ml={3}
                                    mr={3}
                                />
                                
                            </Row>
                        }
                        placeholder='Buscar anúncio'
                    />
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/full/317501.jpg'
                            altImage='oceano'
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/833259.jpg'
                            altImage='cidade'
                        />
                    </Row>
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/254828.jpg'
                            altImage='cidade'
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/447855.jpg'
                            altImage='cidade'
                        />
                    </Row>
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/246623.jpg'
                            altImage='cidade'
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/246323.jpg'
                            altImage='cidade'
                        />
                    </Row>
            </VStack>

        </ScrollView>
    );
}