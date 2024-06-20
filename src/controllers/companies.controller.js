import Companies from "../models/Companies.js"

export const createCompany = async (req, res) => {
    try {
        const company = await Companies.createCompany(req.body);
        res.status(200).json(
            {
                success: true,
                message: 'Company register successfully',
                data: company
            }
        );
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(400).json(
            {
                success: false,
                message: 'Company cannot be register',
                error: error.message
            }
        );
    }
}