<?php

namespace Database\Seeders;

use App\Models\Candidate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class CandidatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = [
            [
                "name" => "Luke Skywalker", 
                "logo_url" => "https://images.bauerhosting.com/legacy/media/6091/2e94/d282/3e74/f6c7/085f/luke.jpg?auto=format&w=1440&q=80",
                "party_name" => "scavengers",
            ],
            [
                "name" => "Darth Vader", 
                "logo_url" => "https://images.bauerhosting.com/legacy/media/6091/2ef1/80b3/f63a/2c5f/aa50/darth-vadar.jpg?auto=format&w=1440&q=80",
                "party_name" => "planet destroyers",
            ],
            [
                "name" => "Han Solo", 
                "logo_url" => "https://images.bauerhosting.com/legacy/media/6091/2f34/2a34/9f73/ad74/956e/han-solo.jpg?auto=format&w=1440&q=80",
                "party_name" => "Ship Wreckers",
            ],
            [
                "name" => "Princess Leia", 
                "logo_url" => "https://images.bauerhosting.com/legacy/media/6091/2e3d/dcb2/f0dd/405d/ed83/leia-sw.jpg?auto=format&w=1440&q=80",
                "party_name" => "Princess White",
            ],
            [
                "name" => "Chewbacca", 
                "logo_url" => "https://images.bauerhosting.com/legacy/media/6091/2e02/6de1/11c1/0d00/5e61/chewwy.jpg?auto=format&w=1440&q=80",
                "party_name" => "Furry",
            ],
            [
                "name" => "Boba Fett", 
                "logo_url" => "https://images.bauerhosting.com/legacy/media/6091/2db5/d282/3e95/f0c7/084e/boba-fett.jpg?auto=format&w=1440&q=80",
                "party_name" => "Villain",
            ],
        ];

        Arr::map($candidates, function ($value, $key) {
            Candidate::create([
                'name' => $value['name'],
                'party_name' => $value['party_name'],
                'logo_url' => $value['logo_url'],
            ]);
        });
    }
}
