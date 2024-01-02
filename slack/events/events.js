import {createRequire} from "module";
import {homeView, getIssueFormMessage} from "../views/views.js";
import {getIssueTemplate} from "../../space/issues/utils.js";
import {issuesApi} from "../../space/issues/issuesApi.js";

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
            view: homeView
        });
    } catch (error) {
        console.error(error);
    }
}

export const fileShareEventListener = async ({event, client, body, context, say}) => {
    const {file_id, channel_id, user_id} = event;

    try {
        const fileInfo = await client.files.info({file: file_id});
        const {file: {mp4, hls_embed, thumb_video}} = fileInfo

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

export const submitIssueToSpace = async ({body, ack}) => {
    // await ack();

    const {
        block_video_url: {videoUrl: {value: videoUrl}},
        block_thumb_video: {videoThumbUrl: {value: videoThumbUrl}},
        block_embed_video: embedVideo,
        block_name: {name: {value: name}},
        block_description: {description: {value: description}}
    } = body.state.values;

    const issueTemplate = getIssueTemplate({
        title: name,
        description: description,
        videoUrl: videoUrl,
        videoThumbUrl: videoThumbUrl
    });

    const issue = await issuesApi.createSpaceIssue(issueTemplate);

}
