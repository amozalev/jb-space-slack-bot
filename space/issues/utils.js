export const getIssueTemplate = ({title, description, videoUrl, videoThumbUrl}) => {
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
            status: process.env.SPACE_OPEN_STATUS_ID,
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