export interface CpfInterface {
    status: boolean;
    return: string;
    consumed?: number;
    message?: string;
    result?: ResultInterface;
}

interface ResultInterface {
    numero_de_cpf: string;
    nome_da_pf: string;
    data_nascimento: string;
    situacao_cadastral: string;
    data_inscricao: string;
    digito_verificador: string;
    comprovante_emitido: string;
    comprovante_emitido_data: string;
}
