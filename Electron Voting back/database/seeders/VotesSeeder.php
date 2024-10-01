<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VotesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users_count = User::all()->count();
        $candidates_count = Candidate::all()->count();
        for ($i=0; $i < 1000; $i++) { 
            $user_id = fake()->numberBetween(1, $users_count);
            $candidate_id = fake()->numberBetween(1, $candidates_count);

            Vote::create([
                "user_id" => $user_id,
                "candidate_id" => $candidate_id,
            ]);
        }
    }
}
