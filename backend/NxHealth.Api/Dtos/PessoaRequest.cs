using System.ComponentModel.DataAnnotations;

namespace NxHealth.Api.Dtos;

public class PessoaRequest
{
    [Required]
    public string NomeCompleto { get; set; } = string.Empty;

    [Required]
    public string CpfCnpj { get; set; } = string.Empty;

    [Required]
    public string Telefone { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
