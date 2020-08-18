using Microsoft.EntityFrameworkCore.Migrations;

namespace BookWorm.Migrations
{
    public partial class MakeCategoryValueNameUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ValueName",
                table: "Categories",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Categories_ValueName",
                table: "Categories",
                column: "ValueName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Categories_ValueName",
                table: "Categories");

            migrationBuilder.AlterColumn<string>(
                name: "ValueName",
                table: "Categories",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
