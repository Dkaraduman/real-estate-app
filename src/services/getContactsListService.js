
const getContactsList = async (baseService) => {
    try {
        if (!baseService) return;

        let allContacts = [];
        let offset = null;
        let params = {};

        do {
            // Add offset to the params if it exists
            if (offset) {
                params.offset = offset;
            }

            // Fetch the contacts
            const response = await baseService().get('Contacts', { params });

            if (response.status === 200) {
                allContacts = allContacts.concat(response.data.records);
                offset = response.data.offset; // Update offset if more data is available
            } else {
                // Handle other status codes appropriately
                console.error('Failed to fetch contacts:', response.status);
                break;
            }

        } while (offset); // Continue fetching until there's no offset left, indicating no more data

        return allContacts; // Return the accumulated list of contacts

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return []; // Return an empty array in case of error
    }
}

export default getContactsList;
