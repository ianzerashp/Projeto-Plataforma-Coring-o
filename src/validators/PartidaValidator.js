import * as Yup from "yup";

const PartidaValidator = Yup.object().shape({
    data: Yup.date()
        .required("Data é obrigatória"),
    adversario: Yup.string()
        .required("Adversário é obrigatório"),
    local: Yup.string()
        .required("Local é obrigatório"),
    horario: Yup.string()
        .matches(/^\d{2}h\d{2}$/, "Horário inválido, use o formato XXhXX")
        .required("Horário é obrigatório"),
    historico: Yup.string()
        .required("Histórico de confrontos é obrigatório")
        .min(10, "O histórico deve ter pelo menos 10 caracteres"),
    analise: Yup.string()
        .required("Análise da partida é obrigatória")
        .min(10, "A análise deve ter pelo menos 10 caracteres"),
});

export default PartidaValidator;