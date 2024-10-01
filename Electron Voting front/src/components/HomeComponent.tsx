import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import VoteContainer from "./VoteContainer";
import { setVoted, updateUserDetails } from "../shared/rdx-slice";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { user_data_db_name } from "../shared/constants";
import { get_request } from "../shared/functions";
import { TCandidate } from "../shared/types";
import { Outlet, useNavigate } from "react-router-dom";

const HomeComponent = React.memo(() => {
    const [candidates, setCandidates] = React.useState<TCandidate[]>([])
    const dispatch = useAppDispatch();
    const hasVoted = useAppSelector(state => state.main.voted)
    const navigate = useNavigate()
    const user_details = useAppSelector(state => state.main.user_details)

    const handleLogout = React.useCallback(() => {
        dispatch(updateUserDetails(undefined));
        window.electron.delete_data(user_data_db_name);
        navigate('login')
    }, []);

    const handleGetCandidates = React.useCallback(async () => {
        const reques_candidates = await get_request('/candidates');
        if (reques_candidates == undefined) return;
        console.log("reques_candidates", reques_candidates);
        setCandidates(reques_candidates.data)
        dispatch(setVoted(reques_candidates.voted_for ?? undefined))
    }, [])

    const handleSeeResults = React.useCallback(() => {
        window.electron.open_result_win()
    }, [])

    React.useLayoutEffect(() => {
        setTimeout(() => {
            handleGetCandidates()            
        }, 10);
    }, [])

    return (
        <MDBContainer fluid className="py-3">
            <div className="h1">Vote for your Presidential Candidate for the Unicorn Universe</div>
            {hasVoted !== undefined && 
                <div className="h3 my-3 text-info">
                    You have already voted in this Presidential election, and you voted for {' '}
                    {candidates.find(candidate => candidate.id == hasVoted)?.name}
                </div>}
            <VoteContainer candidates={candidates} />
            {
                hasVoted == undefined &&
                <MDBBtn className="btn-success mb-4" block onClick={handleLogout}>Vote</MDBBtn>
            }
            <div className="d-flex justify-content-between">
                <MDBBtn className="btn-primary" onClick={handleSeeResults}>See Results</MDBBtn>
                <MDBBtn className="btn-danger" onClick={handleLogout}>Logout</MDBBtn>
            </div>
        </MDBContainer>
    )
})

export default HomeComponent