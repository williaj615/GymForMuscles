using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GymForMuscles.Migrations
{
    public partial class Date : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DateCompleted",
                table: "UserWorkout",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "UserWorkout",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCompleted",
                value: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateCompleted",
                table: "UserWorkout",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "UserWorkout",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateCompleted",
                value: null);
        }
    }
}
