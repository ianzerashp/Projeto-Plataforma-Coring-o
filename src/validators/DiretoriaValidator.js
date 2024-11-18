import * as Yup from "yup";

const DiretoriaValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    cargo: Yup.string().required("Cargo é obrigatório"),
    telefone: Yup.string()
        .matches(/^\(\d{2}\) \d \d{4}-\d{4}$/, "Telefone inválido")
        .required("Telefone é obrigatório"),
    email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
    cpf: Yup.string()
        .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
        .required("CPF é obrigatório"),
    rg: Yup.string()
        .matches(/^\d\.\d{3}\.\d{3}$/, "RG inválido")
        .required("Registro Geral (RG) é obrigatório"),
});

export default DiretoriaValidator;