import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
// import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from "chart.js";
import { Doughnut, Chart } from "react-chartjs-2";
import { get_request, set_a_token } from "../shared/functions";
import { jwtDecode } from "jwt-decode";
import { user_data_db_name } from "../shared/constants";
import { setVoted, updateUserDetails } from "../shared/rdx-slice";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { TCandidate, TVote } from "../shared/types";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);

const ResultApp = React.memo((props: any) => {
    const dispatch = useAppDispatch();
    const [votesLabels, setVoteLabels] = React.useState<string[]>([])
    const [votesCountes, setVoteCounts] = React.useState<number[]>([])
    const [candidates, setCandidates] = React.useState<TCandidate[]>([])
    const user_details = useAppSelector(state => state.main.user_details)
    const votedFor = useAppSelector(state => state.main.voted)

    const handleGetVotes = React.useCallback(async () => {
        const request_votes = await get_request('/votes')
        if (request_votes == undefined) return;
        console.log("request_votes", request_votes);     
        setVoteLabels(request_votes.votes.map((vote: TVote) => vote.name))   
        setVoteCounts(request_votes.votes.map((vote: TVote) => vote.candidate_vote))  
        setCandidates(request_votes.candidates) 
        dispatch(setVoted(request_votes.voted_for))
    }, []);

    const handleGetToken = React.useCallback(async () => {
        const get_token = await window.electron.get_data(user_data_db_name)
        console.log("get_token", get_token);

        
        if (!get_token) return;
        const user_data = jwtDecode(get_token[user_data_db_name] || get_token) as any
        
        set_a_token(get_token[user_data_db_name] || get_token)

        dispatch(updateUserDetails({
            token: get_token[user_data_db_name] || get_token,
            name: user_data.name,
            email: user_data.email
        }))

        handleGetVotes()

    }, []);

    const handleClose = React.useCallback(() => {
        window.electron.close_window()
    }, []);

    React.useLayoutEffect(() => {
        handleGetToken()
    }, []);

    return (
        <MDBContainer fluid className="pb-4 px-0 result-container">
            <div className="drag-win"></div>
            <div className="mx-3">
            <h1>Vote Counts</h1>
            <h3>Welcome {user_details?.name}, you voted for {candidates.find(candidate => candidate.id == votedFor)?.name}</h3>
                <Chart
                    type={'bar'}
                    options={{
                        scales: {
                        y: {
                            beginAtZero: true
                        },
                        
                        }
                    }}
                    data={{
                        labels: votesLabels,
                        datasets: [{
                        label: '# of Votes',
                        data: votesCountes,
                        borderWidth: 1,
                        backgroundColor: 'lightgreen'
                        }]
                    }}
                    {...props}
                    className="no-drag mx-3"
                />

                <div className="d-flex flex-column mt-3">
                    <h3>Candidates</h3>
                    {
                        candidates.map(candidate => 
                            <div className="d-flex mb-3 border-bottom">
                                <img src={candidate.logo_url} className="mx-3" width={"40px"} height={"40px"} style={{objectFit: 'cover'}} />
                                <div>{candidate.name}</div>
                                <div className="mx-3 text-success">{candidate.party_name}</div>
                            </div>
                            )
                    }
                </div>

                <MDBBtn className="btn-danger no-drag" onClick={handleClose}>Close</MDBBtn>
            </div>

        </MDBContainer>
    )
});

export default ResultApp;