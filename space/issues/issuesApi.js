import {axiosClient} from "../../index.js";

export const issuesApi = {
    createSpaceIssue: async ({projectId, data}) => {
        const fetchParams = {
            title: '',
            assignee: null,
            status: '',
        }

        return await axiosClient.post(`/projects/${projectId}/planning/issues?$fields=channel(id),title,id,projectId,number`, {
            ...fetchParams,
            ...data,
        });
    },

    getSpaceIssue: async ({projectId, issueId}) => {
        return await axiosClient.get(`/projects/${projectId}/planning/issues/${issueId}`);
    },

    getSpaceIssueByNumber: async ({projectId, number}) => {
        return await axiosClient.get(`projects/${projectId}/planning/issues/number:${number}`);
    },

    getAllIssueStatuses: async ({projectId}) => {
        return await axiosClient.get(`/projects/${projectId}/planning/issues/statuses`)
    },

    getAllusers: async () => {
        return await axiosClient.get('/team-directory/profiles?$fields=data(id,username)');
    },

    getAllBoards: async ({projectId}) => {
        return await axiosClient.get(`/projects/${projectId}/planning/boards/sprints?$fields=data(id,name,state)`);
    },

    addUserToChannel: async ({issueId, creatorId}) => {
        return await axiosClient.post(`/chats/channels/issue:id:${issueId}/subscribers/users`,
            {profiles: [`id:${creatorId}`]}
        )
    }
};