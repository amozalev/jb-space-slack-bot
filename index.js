import {createRequire} from "module";

const require = createRequire(import.meta.url);

const {App} = require("@slack/bolt");
import {issueCommandHandler, issueViewSubmit,} from "./commands/commands.js";
import {fileShareEventListener, homeEventListener} from "./events/events.js";

require("dotenv").config();

export const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.APP_TOKEN,
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