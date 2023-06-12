import React from "react";
import { Checkbox, Radio, Row, ScrollView, Switch, Text, TextArea, VStack } from "native-base";
import { Header } from "../../components/Header";
import { SafeAreaView } from "react-native";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

export default function EditAdvert (){
    
    const [value, setValue] = React.useState("one");

    return (
        <ScrollView background={'#F7F7F8'} >
            <SafeAreaView   >
                <VStack paddingBottom={7} paddingX={6} background={'#EDECEE'} >
                    <Header
                        back
                        title="Editar anúncio"
                    />
                    <Text fontSize={14} fontWeight={"bold"}>Imagens</Text>
                    <Text mt={2}>Escolha até 3 imagens para mostrar o quanto o seu produto é incrível</Text>
                    <Text fontSize={14} fontWeight={"bold"} mt={8}>Sobre o produto</Text>
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
                                <Radio value="Produto usado">
                                    Produto usado
                                </Radio>
                                <Radio value="Produto novo" ml={6}>
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
                <Row height={90} justifyContent={'space-between'}  mt={6}   paddingX={6}
                alignItems={'center'}
                
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
                    />
                </Row>
            </SafeAreaView>
        </ScrollView>
    )
}