import { Checkbox, Radio, Row, ScrollView, Switch, Text, VStack } from "native-base";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native";
import { Input } from "../../components/input";
import React from "react";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";

export default function CreateAdvert (){
    const [value, setValue] = React.useState("one");

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handlePreviewAdverts(){
        navigation.navigate('preview');
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
                    <Text fontSize={14} fontWeight={"bold"}>Sobre o produto</Text>
                    <Input placeholder="Título do anúncio"/>
                    <Input placeholder="Descrição do produto"/>
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