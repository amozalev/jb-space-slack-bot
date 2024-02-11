import {getIssueFormMessage} from "../views/views.js";
import {issuesApi} from "../../space/issues/issuesApi.js";


const getAllUsers = async () => {
    try {
        const resp = await issuesApi.getAllusers();
        return resp['data']['data'];
    } catch (e) {
        console.error('===== getAllUsers error:', e);
        return [];
    }
}

const getAllIssueStatuses = async () => {
    try {
        const resp = await issuesApi.getAllIssueStatuses({projectId: process.env.SPACE_PROJECT_ID});
        return resp['data'];
    } catch (e) {
        console.error('===== getAllIssueStatuses error:', e);
        return [];
    }
}

const getAllBoards = async () => {
    try {
        const resp = await issuesApi.getAllBoards({projectId: process.env.SPACE_PROJECT_ID});
        return resp['data']['data'];
    } catch (e) {
        console.error('===== getAllBoards error:', e);
        return [];
    }
}

export const createBugShortcut = async ({body, client, ack}) => {
    await ack();

    const {message: {files}, channel: {id: channelId}} = body

    if (files.length) {
        const file = files[0];


        const {mp4, hls_embed, thumb_video, permalink_public} = file;

        const statuses = await getAllIssueStatuses() ?? [];
        const boards = await getAllBoards() ?? [];
        const users = await getAllUsers() ?? [];

        const usersOptions = users.map(({id, username}) => ({
            "text": {
                "type": "plain_text",
                "text": `${username}`,
                "emoji": true
            },
            "value": `${id}`
        }));

        const statusesOptions = statuses.map(({id, name}) => ({
            "text": {
                "type": "plain_text",
                "text": `${name}`,
                "emoji": true
            },
            "value": `${id}`
        }));

        const boardsOptions = boards
            .filter(({state}) => state === 'CURRENT')
            .map(({id, name}) => ({
                "text": {
                    "type": "plain_text",
                    "text": `${name}`,
                    "emoji": true
                },
                "value": `${id}`
            }));

        try {
            const msgResponse = await client.chat.postMessage(getIssueFormMessage({
                channelId: channelId,
                videoUrl: mp4,
                videoThumbnailUrl: thumb_video,
                embedVideoUrl: hls_embed,
                users: usersOptions,
                statuses: statusesOptions,
                boards: boardsOptions
            }));
        } catch (error) {
            console.error(error);
        }
    }
}