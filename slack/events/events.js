import {createRequire} from "module";
import {getHoveView, getIssueFormMessage, getCreatedIssueView} from "../views/views.js";
import {getIssueTemplate} from "../../space/issues/utils.js";
import {issuesApi} from "../../space/issues/issuesApi.js";
import {axiosClient} from "../../index.js";

const require = createRequire(import.meta.url);
let fs = require('fs');


export const messageEventListener = async ({event, client, logger}) => {
    try {
        console.log('==messageEvent dispatched');
        // await say(`Hello, <@${message.user}>`);
    } catch (error) {
        console.error(error);
    }
}

export const homeEventListener = async ({event, client, body, context}) => {
    try {

        const result = await client.views.publish({
            user_id: event.user,
            trigger_id: body.trigger_id,
            view: getHoveView({
                bugsChannelId: process.env.SPACE_BUGS_CHAT_ID,
                videoClipPicture: `${process.env.SLACK_BOT_LOCALHOST}/slack/assets/videoClipPicture.png`,
                shortcutPicture: `${process.env.SLACK_BOT_LOCALHOST}/slack/assets/shortcutPicture.png`
            })
        });
    } catch (error) {
        console.error(error);
    }
}

export const fileShareEventListener = async ({event, client, body, context, say}) => {
    const {file_id, channel_id, user_id} = event;

    try {
        const fileInfo = await client.files.info({file: file_id});
        const {file: {mp4, hls_embed, thumb_video, permalink,}} = fileInfo;

        const msgResponse = await client.chat.postMessage(getIssueFormMessage({
            channelId: channel_id,
            videoUrl: mp4,
            videoThumbnailUrl: thumb_video,
            embedVideoUrl: hls_embed
        }));

    } catch (error) {
        console.error(error);
    }
}

export const submitIssueToSpace = async ({body, client, ack}) => {
    // await ack();

    const {response_url, channel: {id: channelId}, user: {name: userName}} = body;

    const {
        block_video_url: {videoUrl: {value: videoUrl}},
        // block_thumb_video: {videoThumbUrl: {value: videoThumbUrl}},
        // block_embed_video: {embedVideoUrl: {value: embedVideoUrl}},
        block_name: {name: {value: name}},
        block_description: {description: {value: description}},
        block_creator: {creator: {selected_option: {text: {text: creatorName}, value: creatorId}}},
        block_users: {users: {selected_option: {text: {text: assigneeName}, value: user}}},
        block_status: {status: {selected_option: {text: {text: statusName}, value: statusId}}},
        block_boards: {boards: {selected_option: {text: {text: boardName}, value: board}}}
    } = body.state.values;

    const issueTemplate = getIssueTemplate({
        title: name,
        description: description,
        assignee: user,
        createdBy: userName,
        status: statusId,
        sprint: board,
        videoUrl: videoUrl,
        // videoThumbUrl: videoThumbUrl
    });

    const issue = await issuesApi.createSpaceIssue(issueTemplate);
    const {data: {projectId, id: issueId, number, channel: {id: issueChannelId}}} = issue;

    const subscribeResp = await issuesApi.addUserToChannel({issueId, creatorId});

    const issueUrl = `${process.env.SPACE_URL}/p/replan-city/issues/${number}`;

    const resp = await axiosClient.post(response_url, {
        "delete_original": "true",
    });

    const view = getCreatedIssueView({
        channelId: process.env.SPACE_BUGS_CHAT_ID,
        issueName: `${name} (${number})`,
        issueDescription: description,
        createdBy: userName,
        issueStatus: statusName,
        assignee: assigneeName,
        board: boardName,
        issueUrl,
        videoUrl,
    });

    const msgResponse = await client.chat.postMessage(view);
    // const msgResponse1 = await client.chat.postMessage({
    //     channel: process.env.SPACE_BUGS_CHAT_ID,
    //     text: `${videoUrl}`
    // });
}
