export const homeView = {
    type: 'home',
    callback_id: 'home_view',

    blocks: [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Welcome to issues creator bot tab* :tada:"
            }
        },
        {
            "type": "divider"
        },
    ]
}

export const getIssueFormMessage = ({channelId, videoUrl, videoThumbnailUrl, embedVideoUrl}) => ({
    channel: channelId,
    blocks: [
        {
            "type": "input",
            "block_id": "block_video_url",
            "element": {
                "type": "plain_text_input",
                "action_id": "videoUrl",
                "initial_value": videoUrl,
                "placeholder": {
                    "type": "plain_text",
                    "text": 'URL filled in'
                }
            },
            "label": {
                "type": "plain_text",
                "text": "Video url:",
            },
        },
        {
            "type": "input",
            "block_id": "block_thumb_video",
            "element": {
                "type": "plain_text_input",
                "action_id": "videoThumbUrl",
                "initial_value": videoThumbnailUrl,
            },
            "label": {
                "type": "plain_text",
                "text": "Video thumb:",
            },
        },
        {
            "type": "input",
            "block_id": "block_embed_video",
            "element": {
                "type": "plain_text_input",
                "action_id": "embedVideoUrl",
                "initial_value": embedVideoUrl,
            },
            "label": {
                "type": "plain_text",
                "text": "Video thumb:",
            },
        },
        {
            "type": "input",
            "block_id": "block_name",
            "element": {
                "type": "plain_text_input",
                "action_id": "name"
            },
            "label": {
                "type": "plain_text",
                "text": "Name",
                "emoji": true
            }
        },
        {
            "type": "input",
            "block_id": "block_description",
            "element": {
                "type": "plain_text_input",
                "multiline": true,
                "action_id": "description"
            },
            "label": {
                "type": "plain_text",
                "text": "Description",
                "emoji": true
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Create issue :beetle:",
                    },
                    "value": "click_me_123",
                    "action_id": "issue-creation-action"
                }
            ]
        },
    ],
    // Fallback text to use when rich media can't be displayed (i.e. notifications) as well as for screen readers
    text: "A new time off request has been submitted",
})

export const getIssueFormView = ({videoUrl, videoThumbUrl} = {}) => ({
    type: "modal",
    callback_id: 'issue_view',
    title: {
        type: 'plain_text',
        text: 'Create an issue',
    },

    blocks: [
        {
            "type": "input",
            "block_id": "block_name",
            "element": {
                "type": "plain_text_input",
                "action_id": "name"
            },
            "label": {
                "type": "plain_text",
                "text": "Name",
                "emoji": true
            }
        },
        {
            "type": "input",
            "block_id": "block_description",
            "element": {
                "type": "plain_text_input",
                "multiline": true,
                "action_id": "description"
            },
            "label": {
                "type": "plain_text",
                "text": "Description",
                "emoji": true
            }
        },
        {
            "type": "input",
            "block_id": "block_name",
            "element": {
                "type": "plain_text_input",
                "action_id": "name"
            },
            "label": {
                "type": "plain_text",
                "text": "Name",
                "emoji": true
            }
        },
        {
            "type": "input",
            "elements": [
                {
                    "type": "plain_text",
                    "text": `Video URL: ${videoUrl}`
                }
            ]
        },
        {
            "type": "input",
            "title": {
                "type": "plain_text",
                "text": "I Need a Marg",
                "emoji": true
            },
            "image_url": `${videoThumbUrl}`,
            "alt_text": "marg"
        }
    ],
    submit: {
        type: 'plain_text',
        text: 'Create',
    },
});