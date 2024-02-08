export const getIssueTemplate = ({title, description, assignee, createdBy, sprint, status, videoUrl, videoThumbUrl}) => {
    const descriptionTemplate = `Created by: ${createdBy}.\n\n-------------------------------------\n\n${description}\n\nVideo: ${videoUrl}`;

    return {
        projectId: process.env.SPACE_PROJECT_ID,
        data: {
            title,
            description: descriptionTemplate,
            assignee,
            status: status,
            // sprints: sprint
            // attachments: [
            //     {
            //         className: "VideoAttachment",
            //         id: "here_goes_attachment_id",
            //         sizeBytes: 1024,
            //         filename: "myfile.txt"
            //     }
            // ]
            // attachments.files
        }
    }
}