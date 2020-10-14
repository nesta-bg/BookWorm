using Microsoft.EntityFrameworkCore.Migrations;

namespace BookWorm.Migrations
{
    public partial class AddAppUserToShippingsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Shippings",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_AppUserId",
                table: "Shippings",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_AspNetUsers_AppUserId",
                table: "Shippings",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_AspNetUsers_AppUserId",
                table: "Shippings");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_AppUserId",
                table: "Shippings");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Shippings");
        }
    }
}
