import { createCompany } from "../models/Companies.js";

export const registerCompany = async (req, res) => {
    try {
        const companyData = req.body;
        console.log("Creating company with data:", companyData);

        const company = await createCompany(companyData);

        res.status(200).json({
            success: true,
            message: 'Company registered successfully',
            data: company
        });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(400).json({
            success: false,
            message: 'Company registration failed',
            error: error.message
        });
    }
};


