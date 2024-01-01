export const homeView = {
    type: 'home',
    callback_id: 'home_view',

    blocks: [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Welcome to issues creator bot tab_* :tada:"
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click me!"
                    }
                }
            ]
        }
    ]
}

export const issueFormView = {
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
    ],
    submit: {
        type: 'plain_text',
        text: 'Create',
    },
}
