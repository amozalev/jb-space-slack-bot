import {issueFormView} from "../views/views.js";

export const issueCommandHandler = async ({command, ack, body, say, client}) => {
    await ack();

    try {
        // say("Yaaay! that command works!");

        const result = await client.views.open({
            user_id: command.user_id,
            trigger_id: body.trigger_id,
            view: issueFormView
        });
    } catch (error) {
        console.log("err")
        console.error(error);
    }
}

export const issueViewSubmit = async ({ack, body, view, client, logger}) => {
    await ack();

    console.log('==submit', view.state.values);
}