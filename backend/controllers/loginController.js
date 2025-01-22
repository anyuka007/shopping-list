export const loginUser = async (req, res, next) => {
    try {
        return res.status(200).send("Login user");
    } catch (error) {
        return res.status(500).send(error.message || "Error login user");
    }
};
