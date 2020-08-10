using Microsoft.EntityFrameworkCore.Migrations;

namespace BookWorm.Migrations
{
    public partial class PopulateCategoriesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Categories (ValueName, DisplayName) VALUES ('romance', 'Best Romance Books')");
            migrationBuilder.Sql("INSERT INTO Categories (ValueName, DisplayName) VALUES ('history', 'Best History Books')");
            migrationBuilder.Sql("INSERT INTO Categories (ValueName, DisplayName) VALUES ('fantasy', 'Classic Fantasy Books')");
            migrationBuilder.Sql("INSERT INTO Categories (ValueName, DisplayName) VALUES ('graphic', 'Best Graphic Novels')");
            migrationBuilder.Sql("INSERT INTO Categories (ValueName, DisplayName) VALUES ('crime', 'Best Crime and Thriller Books')");
            migrationBuilder.Sql("INSERT INTO Categories (ValueName, DisplayName) VALUES ('folktales', 'Best Fairytales nad Folktales')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
