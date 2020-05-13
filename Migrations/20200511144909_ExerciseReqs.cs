using Microsoft.EntityFrameworkCore.Migrations;

namespace GymForMuscles.Migrations
{
    public partial class ExerciseReqs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "6fc2c55b-bea6-4d9a-a08a-570b98e5b649");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: "07b84166-2ebc-4e50-949e-ba84b6eb7b07");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: "6fc2c55b-bea6-4d9a-a08a-570b98e5b649");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserId",
                value: "07b84166-2ebc-4e50-949e-ba84b6eb7b07");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: "6fc2c55b-bea6-4d9a-a08a-570b98e5b649");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 6,
                column: "UserId",
                value: "07b84166-2ebc-4e50-949e-ba84b6eb7b07");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 7,
                column: "UserId",
                value: "6fc2c55b-bea6-4d9a-a08a-570b98e5b649");

            migrationBuilder.UpdateData(
                table: "Exercise",
                keyColumn: "Id",
                keyValue: 8,
                column: "UserId",
                value: "07b84166-2ebc-4e50-949e-ba84b6eb7b07");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercise_AspNetUsers_UserId",
                table: "Exercise");

            migrationBuilder.DropIndex(
                name: "IX_Exercise_UserId",
                table: "Exercise");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Exercise");
        }
    }
}
