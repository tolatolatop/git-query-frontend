export interface CommitResponse {
    id: string;
    message: string;
    author: string;
    time: number;
    parents: string[];
    depth: number;
}

export interface CommitDepthRequest {
    remote_url: string;
    start_ref: string;
    max_depth: number;
}

export interface ErrorResponse {
    error: string;
} 