import { CpfInterface } from '../interfaces/cpf.interface';

export const cpfMock: CpfInterface = {
    status: true,
    return: 'OK',
    consumed: 1,
    result: {
        numero_de_cpf: '12345678901',
        nome_da_pf: 'Teste Mock',
        data_nascimento: '16\/02\/1998',
        situacao_cadastral: 'REGULAR',
        data_inscricao: '12\/03\/2013',
        digito_verificador: '00',
        comprovante_emitido: '3BC7.B119.AB79.BBA2',
        comprovante_emitido_data: '01:29:59 do dia 18\/05\/2025'
    }
};

export const cpfMockError: CpfInterface = {
    status: false,
    return: 'NOK',
    message: 'Parametro Invalido.'
};

export const cpfMockErrorWithoutMessage: CpfInterface = {
    status: false,
    return: 'NOK'
};
