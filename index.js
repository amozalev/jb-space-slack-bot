import {createRequire} from "module";

const require = createRequire(import.meta.url);

require("dotenv").config();
const {default: axios} = await import('axios');

const {App} = require("@slack/bolt");
import {issueCommandHandler, issueViewSubmit,} from "./slack/commands/commands.js";
import {fileShareEventListener, homeEventListener} from "./slack/events/events.js";

export const axiosClient = axios.create({
    baseURL: new URL(`${process.env.SPACE_URL}/${process.env.SPACE_API_PATH}`).toString(),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SPACE_TOKEN}`
    }
});

export const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

app.event('app_home_opened', homeEventListener);
app.event('file_shared', fileShareEventListener);

app.command("/issue", issueCommandHandler);

app.view('issue_view', issueViewSubmit);

// app.on()
// app.client.files.upload

(async () => {
    const port = 3000
    await app.start(process.env.PORT || port);
    console.log('Bolt app started!!');
})();