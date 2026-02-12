using Microsoft.EntityFrameworkCore;
using NxHealth.Api.Models;

namespace NxHealth.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Pessoa> Pessoas => Set<Pessoa>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var pessoa = modelBuilder.Entity<Pessoa>();
        pessoa.HasKey(x => x.Id);

        pessoa.Property(x => x.NomeCompleto).IsRequired().HasMaxLength(150);
        pessoa.Property(x => x.TipoPessoa).HasMaxLength(30);
        pessoa.Property(x => x.CpfCnpj).IsRequired().HasMaxLength(18);
        pessoa.Property(x => x.Telefone).IsRequired().HasMaxLength(20);
        pessoa.Property(x => x.Email).IsRequired().HasMaxLength(120);
        pessoa.Property(x => x.Cep).HasMaxLength(9);
        pessoa.Property(x => x.Endereco).HasMaxLength(150);
        pessoa.Property(x => x.Logradouro).HasMaxLength(120);
        pessoa.Property(x => x.Bairro).HasMaxLength(120);
        pessoa.Property(x => x.Cidade).HasMaxLength(120);
        pessoa.Property(x => x.Uf).HasMaxLength(2);

        pessoa.HasIndex(x => x.CpfCnpj).IsUnique();
    }
}
