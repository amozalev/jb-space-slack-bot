export const homeView = {
    type: 'home',
    callback_id: 'home_view',

    blocks: [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Welcome to the issues bot* :robot_face:"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "image",
            "image_url": "https://proactions.ru/media/actions/2023/04/04/samokat.jpg.500x300_q95.jpg",
            "alt_text": "inspiration"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `1. Go to the bot channel;\n\n 2. Record a video clip;\n\n 3. Send to bot;\n\n 4. Fill in and submit a form;\n\n 5. Find a confirmation message in <https://replan-group.slack.com/archives/${process.env.SPACE_BUGS_CHAT_ID}|#replan_bugs> channel;\n\n 6. Profit :tada:`
            }
        },
    ]
}

export const getIssueFormMessage = ({channelId, videoUrl, videoThumbnailUrl, embedVideoUrl}) => ({
    channel: channelId,
    blocks: [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Issue form:*"
            },
            "accessory": {
                "type": "overflow",
                "action_id": "msg_delete_action",
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": ":x: Delete",
                            "emoji": true
                        },
                        "value": "delete",
                    }
                ]
            }
        },
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
                "text": "Video url (automatically filled in) :white_check_mark:",
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
                "text": "Video thumb (automatically filled in) :white_check_mark:",
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
                "text": "Embedded video URL (automatically filled in) :white_check_mark:",
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
                "text": "Name :o:",
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
                "text": "Description :o:",
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
    text: "Video is saved, please fill in the issue form",
})


// Used in /issue command
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

export const getCreatedIssueView = ({
                                        channelId,
                                        issueName,
                                        issueDescription,
                                        createdBy,
                                        issueStatus,
                                        issueUrl,
                                        videoUrl,
                                        videoThumbnailUrl,
                                        embeddedVideoUrl,
                                        userName
                                    }) => ({
    "channel": channelId,
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `<${issueUrl}|:beetle: *${issueName}*>`
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": `${issueDescription}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": `Created by: ${createdBy}`,
                "emoji": true
            }
        },
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": `Status: ${issueStatus}`,
                "emoji": true
            }
        },
        // {
        //     "type": "video",
        //     "title": {
        //         "type": "plain_text",
        //         "text": "Issue",
        //         "emoji": true
        //     },
        //     "alt_text": "How to use Slack?",
        //     "description": {
        //         "type": "plain_text",
        //         "text": "Slack is a nifty way to communicate with your team.",
        //         "emoji": true
        //     },
        //     "video_url": videoUrl,
        //     "thumbnail_url": videoThumbnailUrl,
        //     "author_name": userName,
        //     // "provider_name": "YouTube",
        //     // "provider_icon_url": "https://a.slack-edge.com/80588/img/unfurl_icons/youtube.png"
        // }
    ],
    text: "New issue is sent to #replan_bugs channel",
})