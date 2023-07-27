import { Checkbox, Radio, Row, ScrollView, Switch, Text, TextArea, VStack, useToast } from "native-base";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native";
import { Input } from "../../components/input";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductDTO } from "../../dtos/productDTO";
import { useAuth } from "../../hookes/useAuth";
import { AppError } from "../../utils/AppError";
import { AdvertPhoto } from "../../components/AdvertPhoto";
import { Alert } from 'react-native';


type FormDataProps = {
    name: string;
    price: number;
}

const createAdvertSchema = yup.object({
    name: yup.string().required('Informe o título do anúncio.'),
    price: yup.number().required('Informe o valor do produto.'),
})


export default function CreateAdvert (){
    const [isNew, setIsNew] = useState(true);
    const [productCondition, setProductCondition] = useState('Produto novo');
    const [image, setImage] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [acceptTrade, setAceeptTrade] = useState(false);
    const [paymentMethods, setPaymentMethods] = React.useState<string[]>([]);
    const [isLoadingProductStorageData, setIsLoadingProductStorageData ] = useState(false)

    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(createAdvertSchema)
    });

    const { productSaveStorage } = useAuth()
    const toast = useToast()

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    async function handlePreviewAdverts({ name, price} : FormDataProps){

        if(image.length <= 0){
            return Alert.alert("Please fill image ")
        }

        try{
            setIsLoadingProductStorageData(true)
            
            const productData = {
                name, 
                description,
                is_new: isNew,
                price,
                image,
                accept_trade: acceptTrade, 
                payment_methods: paymentMethods            
            } as ProductDTO

            await productSaveStorage(productData)

            navigation.navigate('preview');
        }catch(error){
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível salvar seu produto. Tente novamente mais tarde.' 
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
            
        } finally{
            setIsLoadingProductStorageData(false)
        }
    }

     function handleCanceled(){
        navigation.goBack();
    }

   

    return (
        <SafeAreaView style={{ backgroundColor : '#EDECEE'}} >
                <Header
                    back
                    title="Criar anúncio"
                />
                <ScrollView  >
                <VStack paddingBottom={7} paddingX={6} background={'#EDECEE'} >
                    <Text fontSize={14} fontWeight={"bold"}>Imagens</Text>
                    <Text mt={2}>Escolha até 3 imagens para mostrar o quanto o seu produto é incrível</Text>
                    <Row>

                    <AdvertPhoto 
                        setImage={setImage}
                        image={image}
                        testando={0}
                    />
                       { image.length > 0 ? 
                        <AdvertPhoto 
                        setImage={setImage}
                        image={image}
                        testando={1}
                        />
                    : ''}
                    { image.length > 1 ? 
                        <AdvertPhoto 
                        image={image}
                        setImage={setImage}
                        testando={2}
                        />
                    : ''} 
                    </Row>
                    <Text fontSize={14} fontWeight={"bold"}>Sobre o produto</Text>
                    <Controller
                            control={control}
                            name="name"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    placeholder="Título do anúncio"
                                    autoCapitalize='none'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                    />
                    <TextArea onChangeText={setDescription} value={description} borderRadius={8} borderColor={'#F7F7F8'} bgColor={'#F7F7F8'} h={40} mt={4} w="100%" placeholder="Descrição do produto" autoCompleteType={'none'} />
                        <Radio.Group 
                            name="myRadioGroup" 
                            accessibilityLabel="favorite number" 
                            value={productCondition} 
                            onChange={nextValue => {
                                setProductCondition(nextValue)
                                nextValue === 'Produto novo' ? 
                                setIsNew(true): 
                                setIsNew(false)
                            }}>
                            <Row mt={4}>
                                <Radio value="Produto novo" colorScheme="blue"  >
                                    Produto novo
                                </Radio>
                                <Radio value="Produto usado" colorScheme="blue" ml={6}>
                                    Produto usado
                                </Radio>
                            </Row>
                        </Radio.Group>
                    <Text fontSize={14} fontWeight={"bold"} mt={8}>Venda</Text>
                    <Controller
                            control={control}
                            name="price"
                            render={({field: {onChange, value}}) => (
                                <Input 
                                    keyboardType="number-pad"  
                                    placeholder="Valor do produto"
                                    onChangeText={onChange}                                    
                                    value={value}
                                    errorMessage={errors.price?.message}
                                />
                            )}
                    />
                    <Text fontSize={14} fontWeight={"bold"} mt={4}>Aceita troca ?</Text>
                    <Switch size="md" mt={3} mb={6} value={acceptTrade} onValueChange={setAceeptTrade}  />
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
                <Row height={90} justifyContent={'space-between'} paddingBottom={7}  mt={6}   paddingX={6}
                alignItems={'center'}
                background={'#F7F7F8'}
                >
                    <Button 
                        title="Cancelar"
                        backgroundColor={'#D9D8DA'}
                        width={157}
                        variant={'outline'}
                        onPress={handleCanceled}
                        
                    />
                    <Button 
                        title="Avançar"
                        backgroundColor={'#1A181B'}
                        width={157}
                        onPress={handleSubmit(handlePreviewAdverts)}
                        isLoading={isLoadingProductStorageData}
                    />
                </Row>
        </ScrollView>
            </SafeAreaView>
    )

}