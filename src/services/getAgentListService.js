
const getAgentsList = async (baseService) => {
    try {
        if (!baseService) return;

        let allAgents = [];
        let offset = null;
        let params = {};

        do {
            // Include offset in the params if it exists
            if (offset) {
                params.offset = offset;
            }

            // Fetch the agents
            const response = await baseService().get('Agents', { params });

            if (response.status === 200) {
                allAgents = allAgents.concat(response.data.records);
                offset = response.data.offset; // Update offset if more data is available
            } else {
                // Handle other status codes appropriately
                console.error('Failed to fetch agents:', response.status);
                break;
            }

        } while (offset); // Continue fetching until there's no offset left, indicating no more data

        return allAgents; // Return the accumulated list of agents

    } catch (error) {
        console.error('Error fetching agents:', error);
        return []; // Return an empty array in case of error
    }
}

export default getAgentsList;
