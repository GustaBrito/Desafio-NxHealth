using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NxHealth.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialSqlite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NomeCompleto = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    TipoPessoa = table.Column<string>(type: "TEXT", maxLength: 30, nullable: false),
                    CpfCnpj = table.Column<string>(type: "TEXT", maxLength: 18, nullable: false),
                    Telefone = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Cep = table.Column<string>(type: "TEXT", maxLength: 9, nullable: false),
                    Endereco = table.Column<string>(type: "TEXT", maxLength: 150, nullable: false),
                    Logradouro = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Bairro = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Cidade = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Uf = table.Column<string>(type: "TEXT", maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_CpfCnpj",
                table: "Pessoas",
                column: "CpfCnpj",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pessoas");
        }
    }
}
