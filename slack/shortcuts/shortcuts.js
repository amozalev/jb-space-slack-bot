import {getIssueFormMessage} from "../views/views.js";

export const createBugShortcut = async ({body, client, ...args}) => {

    const {message: {files}, channel: {id: channelId}} = body

    if (files.length) {
        const file = files[0];

        try {
            const {mp4, hls_embed, thumb_video, permalink_public} = file;

            const msgResponse = await client.chat.postMessage(getIssueFormMessage({
                channelId: channelId,
                videoUrl: mp4,
                videoThumbnailUrl: thumb_video,
                embedVideoUrl: hls_embed
            }));
        } catch (error) {
            console.error(error);
        }
    }
}