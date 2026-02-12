using System.ComponentModel.DataAnnotations;

namespace NxHealth.Api.Dtos;

public class PessoaRequest
{
    [Required]
    public string NomeCompleto { get; set; } = string.Empty;

    public string? TipoPessoa { get; set; }

    [Required]
    [RegularExpression(@"^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})$",
        ErrorMessage = "CPF/CNPJ invalido")]
    public string CpfCnpj { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$", ErrorMessage = "Telefone invalido")]
    public string Telefone { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [RegularExpression(@"^$|^\d{5}-?\d{3}$", ErrorMessage = "CEP invalido")]
    public string? Cep { get; set; }

    public string? Endereco { get; set; }

    public string? Logradouro { get; set; }

    public string? Bairro { get; set; }

    public string? Cidade { get; set; }

    [RegularExpression(@"^$|^[A-Za-z]{2}$", ErrorMessage = "UF invalida")]
    public string? Uf { get; set; }
}
