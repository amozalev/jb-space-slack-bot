import {getIssueFormView} from "../views/views.js";
import {issuesApi} from "../../space/issues/issuesApi.js";
import {getIssueTemplate} from "../../space/issues/utils.js";

export const issueCommandHandler = async ({command, ack, body, say, client}) => {
    await ack();

    const view = getIssueFormView();

    try {

        const result = await client.views.open({
            user_id: command.user_id,
            trigger_id: body.trigger_id,
            view
        });
    } catch (error) {
        console.error(error);
    }
}

export const issueViewSubmit = async ({ack, body, view, client, logger}) => {
    await ack();

    const {block_name, block_description, block_attachments} = view.state.values;
    const {name} = block_name;
    const {description} = block_description;
    // const {attachments} = block_attachments;

    // const issue = await issuesApi.getSpaceIssueByNumber({
    //     projectId: process.env.SPACE_PROJECT_ID,
    //     number: 410
    // });

    const issueTemplate = getIssueTemplate({
        name: name.value,
        description: description.value
    });
    const issue = await issuesApi.createSpaceIssue(issueTemplate);

    // const statuses = await issuesApi.getAllIssueStatuses({projectId: process.env.SPACE_PROJECT_ID});
    // console.log('==statuses', statuses);
}