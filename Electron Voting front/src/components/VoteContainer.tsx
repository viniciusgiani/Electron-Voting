import { MDBRadio } from "mdb-react-ui-kit";
import React from "react";
import { TCandidate } from "../shared/types";
import { post_request } from "../shared/functions";
import { useAppDispatch } from "../shared/hooks";
import { useAppSelector } from "../shared/hooks";
import { setVoted } from "../shared/rdx-slice";

const VoteContainer = React.memo((props: {candidates: TCandidate[]}) => {
    const hasVoted = useAppSelector(state => state.main.voted)
    const dispatch = useAppDispatch()
    const handleCastVote = React.useCallback(async (candidate_id: number) => {
        console.log("candidate_id", candidate_id);
        
        if (confirm("Are you sure you want to vote for this candidates?")) {
            // candidate_id
            const request_vote = await post_request('/candidates/vote', {id: candidate_id})
            if (request_vote == undefined) return;
            console.log("request_vote", request_vote);
            alert("Thank you for voting, your vote has been counted!")
            dispatch(setVoted(candidate_id))       
        }
    }, []);

    return (
        <div>
            {
                props.candidates.map(candidate => 
                    <div key={Math.floor(Math.random() * 9999999).toString()} className="d-flex mb-3 align-items-center">
                        <img width={"100px"} height={"100px"} className="mx-2" style={{objectFit: 'cover'}} src={candidate.logo_url} />

                        <div style={{height: 40, backgroundColor: 'lightgray',}} className="d-flex mb-3 align-items-center w-100 p-3 rounded">
                            <MDBRadio disabled={hasVoted !== undefined} 
                                name='candidates' 
                                checked={candidate.id == hasVoted}
                                id={'candidates'+candidate.id} 
                                label={candidate.name} 
                                onChange={() => handleCastVote(candidate.id)} />
                        </div>
                    </div>
                )
            }
        </div>
    )
})

export default VoteContainer