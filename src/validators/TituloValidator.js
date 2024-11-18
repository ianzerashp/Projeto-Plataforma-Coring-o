import * as Yup from "yup";

const TituloValidator = Yup.object().shape({
    titulo: Yup.string()
        .required("Título é obrigatório"),
    ano: Yup.number()
        .required("Ano é obrigatório")
        .min(1800, "Ano inválido")
        .max(new Date().getFullYear(), "Ano não pode ser no futuro"),
    descricao: Yup.string()
        .required("Descrição é obrigatória")
        .min(10, "Descrição deve ter pelo menos 10 caracteres"),
    destaques: Yup.string()
        .required("Destaques são obrigatórios")
        .min(10, "Destaques devem ter pelo menos 10 caracteres"),
    detalhes: Yup.string()
        .required("Detalhes são obrigatórios")
        .min(10, "Detalhes devem ter pelo menos 10 caracteres")
});

export default TituloValidator;