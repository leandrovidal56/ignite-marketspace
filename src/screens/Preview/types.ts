export const transformLabel = (paymentMethodName: string) => {
    const labelName = {
        'boleto' : 'Boleto',
        'Boleto' : 'Boleto',
        'pix' : 'Pix',
        'cash' : 'Dinheiro',
        'Dinheiro' : 'Dinheiro',
        'card' : 'Cartão de Crédito',
        'deposit' : 'Depósito Bancário',
        'Depósito Bancário' : 'Depósito Bancário'
    }
    return labelName[paymentMethodName as keyof typeof labelName]
}

export const getIconName = (paymentMethodName: string) => {
    const icon = {
        'boleto' :  'barcode',
        'Boleto' :  'barcode',
        'pix' : 'qrcode',
        'Dinheiro' : 'cash',
        'cash' : 'cash',
        'card' : 'creditcard',
        'deposit' : 'bank',
        'Depósito Bancário' : 'bank'

    }
    return icon[paymentMethodName as keyof typeof icon]
}



