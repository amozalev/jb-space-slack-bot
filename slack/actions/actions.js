export const deleteMessageAction = async ({body, client, ack}) => {
    const {message: {ts}, channel: {id: channelId}} = body;

    const result = await client.chat.delete({
        channel: channelId,
        ts
    });
}