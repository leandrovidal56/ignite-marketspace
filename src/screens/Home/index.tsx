import { Center, Heading, Text, Modal, VStack, Checkbox, ScrollView, Avatar, Row, Column, Divider, Switch, Box} from 'native-base';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxSale } from '../../components/boxSale';
import { IconComponent } from '../../components/icon';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { BottomNavigation } from '../../components/bottomNavigation';
import { SafeAreaView } from 'react-native';

export default function Home (){

    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    function handleNewAdvert(){
        navigation.navigate('createAdverts')
    }

    function handleGoMyAdvert(){
        navigation.navigate('adverts')
    }

    function handleDetails(){
        navigation.navigate('details')
    }

    function openModal(){
        <Modal />
    }
    
    const [showModal, setShowModal] = useState(false);

    return (
    <SafeAreaView>

    
        <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} padding={6} background={'#EDECEE'}>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content width="400px" bottom={3} marginTop={'auto'}>
            <Modal.CloseButton />
            <Modal.Header>Filtrar anúncios</Modal.Header>
            <Modal.Body>
            <Text fontSize={14} fontWeight={"bold"}>Condição</Text>
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
            </Modal.Body>
            <Modal.Footer justifyContent={'space-between'}>
                    <Button 
                        title="Resetar filtros"
                        backgroundColor={'#D9D8DA'}
                        width={157}
                        variant={'outline'}
                        onPress={() => setShowModal(false)}
                    />
                    <Button 
                        title="Aplicar filtros"
                        backgroundColor={'#1A181B'}
                        width={157}
                    />
            </Modal.Footer>
            </Modal.Content>
        </Modal>

            <Center justifyContent={'space-between'} height={42} flexDirection={'row'}>
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
                    iconLeftName='plus'
                    iconColor='#F7F7F8'
                    onPress={handleNewAdvert}
                />
            </Center>
            <VStack mt={8}>
                <Text color={'#5F5B62'}>Seus produtos anunciados para venda</Text>
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
                    <Button 
                        title='Meus anúncios'
                        width={111}
                        backgroundColor={'none'}
                        iconRightName='arrowright'
                        textColor='#364D9D'
                        iconColor='#364D9D'
                        mr={5}
                        onPress={handleGoMyAdvert}
                    
                    />
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
                                    onPress={() => setShowModal(true)}
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
                            onPress={handleDetails}
                        />
                        <BoxSale
                            type='novo'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/833259.jpg'
                            altImage='cidade'
                            onPress={handleDetails}
                        />
                    </Row>
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='novo'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/254828.jpg'
                            altImage='cidade'
                            onPress={handleDetails}
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/447855.jpg'
                            altImage='cidade'
                            onPress={handleDetails}
                        />
                    </Row>
                    <Row justifyContent={'space-between'} mt={6}>
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/246623.jpg'
                            altImage='cidade'
                            onPress={handleDetails}
                        />
                        <BoxSale
                            type='usado'
                            title='Tênis vermelho'
                            price={59.90}
                            imageAdress='https://wallpaperaccess.com/thumb/246323.jpg'
                            altImage='cidade'
                            onPress={handleDetails}
                        />
                    </Row>
            </VStack>
        </ScrollView>
        <BottomNavigation/>
    </SafeAreaView>

    );
}