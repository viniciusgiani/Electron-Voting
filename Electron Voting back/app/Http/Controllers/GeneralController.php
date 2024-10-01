<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeneralController extends Controller
{
    public function get_candidates (Request $request) {
        $all_candidates = Candidate::all();
        $user = auth()->user();
        $user_has_voted = Vote::where('user_id',$user->id)->first();
        return response()->json(["data" => $all_candidates, "voted_for" => !$user_has_voted ? null : $user_has_voted->candidate_id], 200);
    }

    public function get_votes (Request $request) {
        $all_votes = DB::table('candidates')
        ->leftJoin('votes', 'votes.candidate_id', '=', 'candidates.id')
        ->select(DB::raw('candidates.*, count(votes.candidate_id) as candidate_vote'))
        ->groupBy('candidates.id', 'candidates.name', 'candidates.party_name', 'candidates.logo_url', 'candidates.created_at', 'candidates.updated_at')
        ->get();
        
        $all_candidates = Candidate::all();
        $user = auth()->user();
        $user_has_voted = Vote::where('user_id',$user->id)->first();
        return response()->json(["votes" => $all_votes, "candidates" => $all_candidates, "voted_for" => !$user_has_voted ? null : $user_has_voted->candidate_id], 200);
    }

    public function vote_candidates (Request $request) {
        $get_candidate = Candidate::find($request->id);
        if (!$get_candidate) {
            return response()->json(['msg' => 'candidate not found'], 404);
        }

        $user = auth()->user();

        $vote = Vote::create([
            'user_id' => $user->id,
            'candidate_id' => $get_candidate->id,
        ]);

        if ($vote) {
            return response()->json(["msg" => "Vote successful"], 201);
        }else{
            return response()->json(["msg" => "Internal server error"], 500);
        }
    }
}
