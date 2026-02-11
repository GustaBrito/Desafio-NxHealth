export const UF_OPCOES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
];

export const FORM_EMPTY_VALUES = {
  nomeCompleto: "",
  tipoPessoa: "",
  cpfCnpj: "",
  cep: "",
  endereco: "",
  logradouro: "",
  bairro: "",
  cidade: "",
  uf: "",
  telefone: "",
  email: ""
};

export function mapPessoaApiToForm(data) {
  return {
    ...FORM_EMPTY_VALUES,
    nomeCompleto: data?.nomeCompleto ?? "",
    tipoPessoa: data?.tipoPessoa ?? "",
    cpfCnpj: data?.cpfCnpj ?? "",
    cep: data?.cep ?? "",
    endereco: data?.endereco ?? "",
    logradouro: data?.logradouro ?? "",
    bairro: data?.bairro ?? "",
    cidade: data?.cidade ?? "",
    uf: data?.uf ?? "",
    telefone: data?.telefone ?? "",
    email: data?.email ?? ""
  };
}
