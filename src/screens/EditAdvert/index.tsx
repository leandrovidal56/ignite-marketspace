import React, { useEffect, useState } from "react";
import { Checkbox, Radio, Row, ScrollView, Switch, Text, TextArea, VStack, useToast } from "native-base";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useRoute } from '@react-navigation/native';
import { ProductDetailsDTO } from "../../dtos/productDetailsDTO";
import { api } from "../../services/api";
import { AdvertPhotoNew } from "../../components/AdvertPhotoNew";
import { useProduct } from '../../hooks/useProduct';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/app.routes';
import { AppError } from '../../utils/AppError';
import { Loading } from '../../components/loading';

export default function EditAdvert (){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [productCondition, setProductCondition] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [acceptTrade, setAceeptTrade] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

    const { image, setImage  } = useProduct()
    const toast = useToast()
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    
    const route = useRoute();

    type RouteParamsProps = {
        data: ProductDetailsDTO;
    }


    const { data } = route.params as RouteParamsProps;
    
    async function loadData() {
        if(data) {
            if(data.accept_trade) {
                setAceeptTrade(true);
            }
            if(data.product_images) {
                setImage(data.product_images);
            }
            if(data.is_new) {
                setProductCondition('Produto novo');
            }
            if(!data.is_new) {
                setProductCondition('Produto usado');
            }
        };
    }
    async function loadPaymentMethods(){
        try{
            setIsLoading(true)
            if(data.payment_methods){
                const response = data.payment_methods.map((item) => item.key);
                setPaymentMethods(response)
            }
        }catch(error){
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
            setIsLoading(false)
        }
    }


    useEffect(() => {
        loadPaymentMethods();
        loadData();
    }, []);

    async function editProduct(){
        if(!name){
           return  setName(data.name)
        }
        if(!description){
           return  setDescription(data.description)
        }
        if(!price){
           return  setPrice(data.price)
        }
        const editProductData = {
            name,
            description,
            isNew,
            price,
            acceptTrade,
            payment_methods :paymentMethods,
        } as any
        const product_id = data.id
        try{
            await api.put(`/products/${product_id}`, editProductData)
            let formData = new FormData();
            formData.append('product_id', product_id as any);
            image.map(( image ) => {
                formData.append('images', image as any);
            })
            
            await api.post('/products/images/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            await toast.show({
                title: 'Produto editado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })
            navigation.navigate('home')
            
        }catch(error){
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } 
    }
    
    return (
        <SafeAreaView style={{ backgroundColor: '#EDECEE'}} >
            <ScrollView>
                    {
                        isLoading ?
                        <Loading/> 
                        :
                <VStack paddingBottom={7} paddingX={6} >
                    <Header
                        clearImages
                        back
                        title="Editar anúncio"
                    />
                    
                    <Text fontSize={14} fontWeight={"bold"}>Imagens</Text>
                    <Text mt={2}>Escolha até 3 imagens para mostrar o quanto o seu produto é incrível</Text>
                        <AdvertPhotoNew/>
                    <Text fontSize={14} fontWeight={"bold"} mt={8}>Sobre o produto</Text>
                    <Input placeholder="Título do anúncio" defaultValue={data.name} onChangeText={text => setName(text)} />
                    <TextArea 
                        borderRadius={8} 
                        borderColor={'#F7F7F8'} 
                        bgColor={'#F7F7F8'} 
                        h={40} 
                        mt={4} 
                        w="100%" 
                        placeholder="Descrição do produto" 
                        autoCompleteType={'none'} 
                        onChangeText={ text => setDescription(text)}
                        defaultValue={data.description}
                    />
                        <Radio.Group 
                            name="myRadioGroup" 
                            accessibilityLabel="favorite number" 
                            value={isNew ? 'Produto novo' : 'Produto usado'} 
                            defaultValue={productCondition}
                            onChange={nextValue => {
                                
                                nextValue === 'Produto novo' ? 
                            setIsNew(true): 
                            setIsNew(false)
                              }}>
                            <Row mt={4}>
                                <Radio value="Produto usado" isPressed={true}  colorScheme="blue" >
                                    Produto usado
                                </Radio>
                                <Radio value="Produto novo" colorScheme="blue" ml={6}>
                                    Produto novo 
                                </Radio>
                            </Row>
                        </Radio.Group>
                    <Text fontSize={14} fontWeight={"bold"} mt={8}>Venda</Text>
                    <Input 
                     leftElement={
                        <Text color='gray.700' fontSize='md' ml='4'>
                            R$
                        </Text>
                    }
                    placeholder="Valor do produto"  
                    defaultValue={data.price?.toString()} 
                    onChangeText={ text => setPrice(Number(text))}
                    />
                    <Text fontSize={14} fontWeight={"bold"} mt={4}>Aceita troca ?</Text>
                    <Switch 
                        size="md"
                        mt={3}
                        mb={6}  
                        value={acceptTrade} 
                        isChecked={acceptTrade}
                        onChange={() => setAceeptTrade(!acceptTrade)}
                    />
                    <Text fontSize={14} fontWeight={"bold"}>Meios de pagamento aceitos</Text>
                    <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods} accessibilityLabel="choose numbers">
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
                            value="cash"
                            >
                            Dinheiro
                        </Checkbox>
                        <Checkbox mt={3}
                            value="card"
                            >
                            Cartão de Crédito
                        </Checkbox>
                        <Checkbox mt={3}
                            value="deposit"
                            >
                            Depósito Bancário
                        </Checkbox>
                    </Checkbox.Group>
                </VStack>
                }
                <Row height={90} justifyContent={'space-between'}  mt={6}   
                    paddingX={6} alignItems={'center'}
                >
                    <Button 
                        title="Cancelar"
                        backgroundColor={'#D9D8DA'}
                        width={157}
                        height={42}
                        variant={'outline'}
                        borderRadius={6}
                    />
                    <Button 
                        title="Avançar"
                        backgroundColor={'#1A181B'}
                        width={157}
                        height={42}
                        borderRadius={6}
                        onPress={editProduct}
                    />
                </Row>
            </ScrollView>
        </SafeAreaView>
    )
}