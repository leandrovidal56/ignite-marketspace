export const transformLabel = (paymentMethodName: string) => {
    const labelName = {
        'boleto' : 'Boleto',
        'pix' : 'Pix',
        'cash' : 'Dinheiro',
        'card' : 'Cartão de Crédito',
        'deposit' : 'Depósito Bancário '
    }
    return labelName[paymentMethodName as keyof typeof labelName]
}

export const getIconName = (paymentMethodName: string) => {
    const icon = {
        'boleto' :  'barcode',
        'pix' : 'qrcode',
        'cash' : 'cash',
        'card' : 'creditcard',
        'deposit' : 'bank'

    }
    return icon[paymentMethodName as keyof typeof icon]
}



