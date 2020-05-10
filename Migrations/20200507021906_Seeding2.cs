using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GymForMuscles.Migrations
{
    public partial class Seeding2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCompleted",
                table: "UserWorkout",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.UpdateData(
                table: "UserWorkout",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCompleted", "UserId" },
                values: new object[] { null, "07b84166-2ebc-4e50-949e-ba84b6eb7b07" });

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "07b84166-2ebc-4e50-949e-ba84b6eb7b07");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: "6fc2c55b-bea6-4d9a-a08a-570b98e5b649");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: "6fc2c55b-bea6-4d9a-a08a-570b98e5b649");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCompleted",
                table: "UserWorkout",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "UserWorkout",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCompleted", "UserId" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "11433070-4a7e-4826-835c-a1dffdc2158d" });

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "11433070-4a7e-4826-835c-a1dffdc2158d");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: "98a14d41-151e-428b-83b6-b6718e6d17c1");

            migrationBuilder.UpdateData(
                table: "Workout",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: "98a14d41-151e-428b-83b6-b6718e6d17c1");
        }
    }
}
