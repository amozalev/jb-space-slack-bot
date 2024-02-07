export const getIssueTemplate = ({title, description, assignee, sprint, status, videoUrl, videoThumbUrl}) => {
    const descriptionTemplate = `
    ${description}\n
    
    ${videoUrl ? `Video URL: ${videoUrl}` : ''}
    
    ${videoThumbUrl ? `Video thumbnail: ${videoThumbUrl}` : ''}
    `;

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