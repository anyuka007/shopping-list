export const addNewUser = async (req, res, next) => {
    try {
        return res.status(200).send("Add new user");
    } catch (error) {
        return res.status(500).send(error.message || "Error adding new user");
    }
};
