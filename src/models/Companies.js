import { ObjectId } from "mongodb";
import { dbConnection } from "../database/db.js";

const getCollection = async () => {
    const db = await dbConnection();
    return db.collection('companies');
};

const createCompany = async (companyData) => {
    const collection = await getCollection();

    // Verificar que todos los campos necesarios están presentes
    if (!companyData.email || !companyData.password || !companyData.companyName || !companyData.managerName || !companyData.address) {
        throw new Error('All fields are required');
    }

    const existingCompany = await collection.findOne({ email: companyData.email });
    if (existingCompany) {
        throw new Error('Email already exists');
    }

    companyData.role = 'user';
    companyData.createdAt = new Date();
    companyData.updatedAt = new Date();

    const result = await collection.insertOne(companyData);

    console.log('Insert result:', result);

    if (!result.insertedId) {
        throw new Error('Failed to create company');
    }

    const newCompany = await collection.findOne({ _id: result.insertedId });
    return newCompany;
}

const getCompanyById = async (id) => {
    const collection = await getCollection();
    const company = await collection.findOne({ _id: new ObjectId(id) });
    return company;
};

const updateCompany = async (id, companyData) => {
    const collection = await getCollection();
    companyData.updatedAt = new Date();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: companyData });
    return await getCompanyById(id);
};

const deleteCompany = async (id) => {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
};

export {
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany
};


