import {axiosClient} from "../../index.js";

export const issuesApi = {
    createSpaceIssue: async ({projectId, data}) => {
        const fetchParams = {
            title: '',
            status: '',
        }

        return await axiosClient.post(`/projects/${projectId}/planning/issues`, {
            ...fetchParams,
            ...data
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
    }
};