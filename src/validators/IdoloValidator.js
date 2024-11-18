import * as Yup from "yup";

const IdoloValidator = Yup.object().shape({
    nome: Yup.string()
        .required("Nome é obrigatório")
        .min(2, "Nome deve ter pelo menos 2 caracteres"),
    posicao: Yup.string()
        .required("Posição é obrigatória")
        .min(2, "Posição deve ter pelo menos 2 caracteres"),
    anosNoTime: Yup.number()
        .required("Anos no time é obrigatório")
        .min(1, "Anos no time deve ser pelo menos 1"),
    conquistas: Yup.string()
        .required("Principais conquistas são obrigatórias")
        .min(5, "Conquistas devem ter pelo menos 5 caracteres"),
});

export default IdoloValidator;