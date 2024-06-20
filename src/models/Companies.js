import { ObjectId } from "mongodb";
import { dbConnection } from "../database/db";

const getCollection = async () => {
    const db = await dbConnection();
    return db.collection('companies')
}

const createCompany = async (companyData) => {
    const collection = await getCollection();

    if (!companyData.email || !companyData.password || !companyData.companyName || !companyData.managerName || companyData.address) {
        throw new error('All fields are required ')
    };

    const existingCompany = await collection.findOne({ email: companyData.email });
    if (existingCompany) {
        throw new error('Email already exists')
    };

    companyData.role = 'user';
    companyData.createdAt = new Date();
    companyData.updatedAt = new Date();

    const result = await collection.insertOne(companyData);
    return result.ops[0]; //array con info del elemento insertado
};

const getCompanyById = async (id) => {
    const collection = await getCollection();
    const company = await collection.findOne({_id: new Object(id)});
    return company;
};

const updateCompany = async (id, companyData) => {
    const collection = await getCollection();
    companyData.updatedAt = new Date();
    await collection.updateOne({_id: new ObjectId(id)}, {$set: companyData});
    return await getCompanyById(id);
};

const deleteCompany = async (id) => {
    const collection = await getCollection();
    const result = await collection.deleteOne({_id: new ObjectId(id)});
    return result.deletedCount > 0;
};

module.exports = {
    createCompany,
    getCompanyById,
    updateCompany,
    deleteCompany,
};

