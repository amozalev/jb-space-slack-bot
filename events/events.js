import {homeView, issueFormView} from "../views/views.js";

export const homeEventListener = async ({event, client, context}) => {
    try {
        console.log('homeEvent dispatched');

        const result = await client.views.publish({
            user_id: event.user,
            view: homeView
        });
    } catch (error) {
        console.error(error);
    }
}

export const fileShareEventListener = async ({event, client, context}) => {
    try {
        // Call the files.upload method using the WebClient
        const result = await client.files.upload({
            // channels can be a list of one to many strings
            channels: event.channel_id,
            initial_comment: "Here\'s my file :smile:",
            // Include your filename in a ReadStream here
            file: createReadStream(fileName)
        });

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export const messageEventListener = async ({event, client, logger}) => {
    try {
        console.log('==messageEvent dispatched');
        // await say(`Hello, <@${message.user}>`);
    } catch (error) {
        console.error(error);
    }
}

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