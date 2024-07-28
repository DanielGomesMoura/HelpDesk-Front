export interface Cliente{
    id?:         any;
    nome:        string;
    cpf:         string;
    email:       string;
    senha:       string;
    perfis:     (string | number)[];
    dataCriacao: any;
}