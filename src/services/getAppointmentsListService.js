
const getAppointmentsList = async (baseService) => {
    try {
        if (!baseService) return;

        let allAppointments = [];
        let offset = null;
        let params = {};

        do {
            // Include offset in the params if it exists
            if (offset) {
                params.offset = offset;
            }

            // Fetch the appointments
            const response = await baseService().get('Appointments', { params });

            if (response.status === 200) {
                allAppointments = allAppointments.concat(response.data.records);
                offset = response.data.offset; // Update offset if more data is available
            } else {
                // Handle other status codes appropriately
                console.error('Failed to fetch appointments:', response.status);
                break;
            }

        } while (offset); // Continue fetching until there's no offset left, indicating no more data

        return allAppointments; // Return the accumulated list of appointments

    } catch (error) {
        console.error('Error fetching appointments:', error);
        return []; // Return an empty array in case of error
    }
}

export default getAppointmentsList;
