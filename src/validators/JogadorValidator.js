import * as Yup from "yup";

const JogadorValidator = Yup.object().shape({
    nome: Yup.string().required("Nome é obrigatório"),
    posicao: Yup.string().required("Posição é obrigatória"),
    numero: Yup.number()
        .typeError("Número deve ser um valor numérico")
        .required("Número é obrigatório")
        .positive("Número deve ser positivo")
        .integer("Número deve ser um valor inteiro"),
    data_nascimento: Yup.string()
        .required("Data de nascimento é obrigatória")
        .matches(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
            "Data de nascimento deve estar no formato DD/MM/AAAA"
        )
        .test("data-valida", "Data de nascimento inválida", value => {
            if (!value) return false;
            const [dia, mes, ano] = value.split("/").map(Number);
            const data = new Date(ano, mes - 1, dia);
            return (
                data.getFullYear() === ano &&
                data.getMonth() === mes - 1 &&
                data.getDate() === dia
            );
        }),
    imagem: Yup.string()
        .url("Link da imagem deve ser um URL válido")
});

export default JogadorValidator;