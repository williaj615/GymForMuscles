using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GymForMuscles.Migrations
{
    public partial class Seeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StreetAddress",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MuscleGroup",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workout",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workout", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workout_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Workout_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Exercise",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    MuscleGroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exercise_MuscleGroup_MuscleGroupId",
                        column: x => x.MuscleGroupId,
                        principalTable: "MuscleGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserWorkout",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    WorkoutId = table.Column<int>(nullable: false),
                    DateCompleted = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWorkout", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserWorkout_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserWorkout_Workout_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workout",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkoutExercise",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(nullable: false),
                    WorkoutId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkoutExercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkoutExercise_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkoutExercise_Workout_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workout",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Upper Body" },
                    { 2, "Lower Body" },
                    { 3, "Full Body" },
                    { 4, "Cardio" }
                });

            migrationBuilder.InsertData(
                table: "MuscleGroup",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Biceps" },
                    { 2, "Quadriceps" },
                    { 3, "Triceps" },
                    { 4, "Obliques" },
                    { 5, "Gluteus Maximus" },
                    { 6, "Chest" },
                    { 7, "Hamstrings" },
                    { 8, "Calves" },
                    { 9, "Shoulders" }
                });

            migrationBuilder.InsertData(
                table: "Exercise",
                columns: new[] { "Id", "MuscleGroupId", "Name" },
                values: new object[,]
                {
                    { 6, 1, "Dumbbell Curl" },
                    { 8, 1, "Pull Up" },
                    { 1, 2, "Lunges" },
                    { 2, 2, "Squats" },
                    { 7, 3, "Tricep Extension" },
                    { 3, 6, "Bench Press" },
                    { 5, 7, "Deadlift" },
                    { 4, 9, "Overhead Press" }
                });

            migrationBuilder.InsertData(
                table: "Workout",
                columns: new[] { "Id", "CategoryId", "Name", "UserId" },
                values: new object[,]
                {
                    { 1, 2, "Leg Day", "07b84166-2ebc-4e50-949e-ba84b6eb7b07" },
                    { 2, 3, "Bikini Body", "6fc2c55b-bea6-4d9a-a08a-570b98e5b649" },
                    { 3, 4, "Fitness Tester", "6fc2c55b-bea6-4d9a-a08a-570b98e5b649" }
                });

            migrationBuilder.InsertData(
                table: "UserWorkout",
                columns: new[] { "Id", "DateCompleted", "UserId", "WorkoutId" },
                values: new object[] { 1, null, "07b84166-2ebc-4e50-949e-ba84b6eb7b07", 3 });

            migrationBuilder.InsertData(
                table: "WorkoutExercise",
                columns: new[] { "Id", "ExerciseId", "WorkoutId" },
                values: new object[,]
                {
                    { 5, 6, 2 },
                    { 6, 8, 3 },
                    { 1, 1, 1 },
                    { 7, 1, 3 },
                    { 2, 2, 1 },
                    { 4, 3, 2 },
                    { 3, 5, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercise_MuscleGroupId",
                table: "Exercise",
                column: "MuscleGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkout_UserId",
                table: "UserWorkout",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkout_WorkoutId",
                table: "UserWorkout",
                column: "WorkoutId");

            migrationBuilder.CreateIndex(
                name: "IX_Workout_CategoryId",
                table: "Workout",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Workout_UserId",
                table: "Workout",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercise_ExerciseId",
                table: "WorkoutExercise",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercise_WorkoutId",
                table: "WorkoutExercise",
                column: "WorkoutId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserWorkout");

            migrationBuilder.DropTable(
                name: "WorkoutExercise");

            migrationBuilder.DropTable(
                name: "Exercise");

            migrationBuilder.DropTable(
                name: "Workout");

            migrationBuilder.DropTable(
                name: "MuscleGroup");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.AddColumn<string>(
                name: "StreetAddress",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
