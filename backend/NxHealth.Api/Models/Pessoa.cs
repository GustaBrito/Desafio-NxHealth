namespace NxHealth.Api.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string NomeCompleto { get; set; } = string.Empty;
    public string? TipoPessoa { get; set; }
    public string CpfCnpj { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Cep { get; set; }
    public string? Endereco { get; set; }
    public string? Logradouro { get; set; }
    public string? Bairro { get; set; }
    public string? Cidade { get; set; }
    public string? Uf { get; set; }
}
