import { Box, Checkbox, Icon,  Radio, Row, ScrollView, Switch, Text, TextArea, VStack } from "native-base";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native";
import { Input } from "../../components/input";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { IconComponent } from "../../components/icon";
import * as ImagePicker from 'expo-image-picker';

export default function CreateAdvert (){
    const [value, setValue] = React.useState("one");
    const [image, setImage] = useState(['']);

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handlePreviewAdverts(){
        navigation.navigate('preview');
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);

        if(!result.canceled){
            setImage(result.assets[0].uri)
        }

      };
      console.log(image)

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
                    <Button 
                        onPress={pickImage} 
                        mt={3} mb={5} width={100} height={100} background={'#D9D8DA'} 
                        alignItems={'center'} 
                        justifyContent={'center'} 
                        borderRadius={6}
                        startIcon={<IconComponent name="plus" size={5} />}
                    />
                    <Text fontSize={14} fontWeight={"bold"}>Sobre o produto</Text>
                    <Input placeholder="Título do anúncio"/>
                    <TextArea borderRadius={8} borderColor={'#F7F7F8'} bgColor={'#F7F7F8'} h={40} mt={4} w="100%" placeholder="Descrição do produto" autoCompleteType={'none'} />
                        <Radio.Group 
                            name="myRadioGroup" 
                            accessibilityLabel="favorite number" 
                            value={value} 
                            
                            onChange={nextValue => {
                                setValue(nextValue);
                            }}>
                            <Row mt={4}>
                                <Radio value="Produto usado" colorScheme="blue">
                                    Produto usado
                                </Radio>
                                <Radio value="Produto novo" colorScheme="blue" ml={6}>
                                    Produto novo
                                </Radio>
                            </Row>
                        </Radio.Group>
                    <Text fontSize={14} fontWeight={"bold"} mt={8}>Venda</Text>
                    <Input placeholder="Valor do produto"/>
                    <Text fontSize={14} fontWeight={"bold"} mt={4}>Aceita troca ?</Text>
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
                    />
                    <Button 
                        title="Avançar"
                        backgroundColor={'#1A181B'}
                        width={157}
                        onPress={handlePreviewAdverts}
                    />
                </Row>
        </ScrollView>
            </SafeAreaView>
    )

}