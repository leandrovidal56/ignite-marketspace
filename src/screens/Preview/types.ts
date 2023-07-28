export const transformLabel = (paymentMethodName: string) => {
    console.log(paymentMethodName, 'take transform label')
    const labelName = {
        'boleto' : 'Boleto',
        'Boleto' : 'Boleto',
        'pix' : 'Pix',
        'cash' : 'Dinheiro',
        'Dinheiro' : 'Dinheiro',
        'card' : 'Cartão de Crédito',
        'deposit' : 'Depósito Bancário '
    }
    console.log('return',  labelName[paymentMethodName as keyof typeof labelName])
    return labelName[paymentMethodName as keyof typeof labelName]
}

export const getIconName = (paymentMethodName: string) => {
    console.log(paymentMethodName, 'take getIconName')
    const icon = {
        'boleto' :  'barcode',
        'Boleto' :  'barcode',
        'pix' : 'qrcode',
        'Dinheiro' : 'cash',
        'cash' : 'cash',
        'card' : 'creditcard',
        'deposit' : 'bank'

    }
    console.log('return getIconName', icon[paymentMethodName as keyof typeof icon])
    return icon[paymentMethodName as keyof typeof icon]
}



