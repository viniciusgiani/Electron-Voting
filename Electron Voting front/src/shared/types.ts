// Define a type for the slice state
export interface IMainState {
    voted: number | undefined;
    user_details: TUserDetails | undefined
}

export type TUserDetails = {
    token: string;
    name: string;
    email: string;
}

export type TCandidate = {
    id: number;
    name: string;
    party_name: string,
    logo_url: string;
    created_at: string;
    updated_at: string;
};

export type TVote = {
    id: number,
    name: string;
    party_name: string;
    logo_url: string;
    created_at: string;
    updated_at: string;
    candidate_vote: number;
};