import express, { Request, Response } from "express";
import { Division } from "../modals/Divison";
import { UserContact } from "../modals/Station";
import xlsx from 'xlsx';
import { Document } from "mongoose";



const Listlobby = async (request: Request, response: Response) => {
    const lobby = await Division.find()
    return response.json({ Lobby: lobby });
}


const Updatelobby = async (request: Request, response: Response) => {
    const dataForUpdate = request.body.updateLobby
    try {
        const lobby = await Division.updateOne({ code: request.body.whereLobby }, { $set: { code: dataForUpdate } })
        await UserContact.updateMany({ stationId: request.body.whereLobby }, { $set: { stationId: dataForUpdate } })

        return response.json({ Lobby: lobby, message: "Lobby updated successfully...!" });
    } catch (error) {
        return response.status(500).send({ status: 500, message: 'update error', error });
    }
}

const insertlobby = async (request: Request, response: Response) => {
    try {
        await Division.create({
            lobbyId: request.body.lobbyId,
            code: request.body.code,
        });
        return response.send({ status: 200, message: 'Lobby Created successfully...!' });
    } catch (error: any) {
        return response.status(500).send({ status: 500, message: error.errors.lobbyId.message });
    }
}

const Deletedlobby = async (request: Request, response: Response) => {
    console.log('Deletedlobby', request.body.whereLobby)
    try {
        const lobby = await Division.deleteOne({ code: request.body.whereLobby })
        await UserContact.deleteMany({ stationId: request.body.whereLobby })
        return response.json({ Lobby: lobby, message: "Lobby deleted successfully...!" });
    } catch (error) {
        return response.status(500).send({ status: 500, message: 'delete error', error });
    }
}

const insertdata = async (request: Request, response: Response) => {
    if (request.file) {
        try {
            const file: Express.Multer.File | any = request.file; // Access the uploaded file using request.file

            if (!file) {
                return response.status(400).send({ status: 400, message: 'File not provided' });
            }
            const workbook = xlsx.read(file.buffer, { type: 'buffer' });
            const sheetNames = (workbook.SheetNames).toLocaleString();
            const sheet = workbook.Sheets[sheetNames];
            const P_JSON = xlsx.utils.sheet_to_json(sheet);
            const result = await UserContact.insertMany(P_JSON);

            if (result.length > 0) {
                return response.send({ status: 200, message: 'success', count: result.length });
            } else {
                return response.send({ status: 201, message: 'no data found', count: result.length });
            }
        } catch (error) {
            return response.status(500).send({ status: 500, message: 'Error inserting data', error });
        }
    } else {
        try {
            await UserContact.insertMany({
                stationId: request.body.stationId,
                number: request.body.number,
                name: request.body.name,
            });
            return response.send({ status: 200, message: 'contact insertd Succefully', });
        } catch (error) {
            return response.status(500).send({ status: 500, message: 'Error inserting data', error });
        }
    }
};

const Usercontact = async (request: Request, response: Response) => {
    // const usercontact = await UserContact.find({})
    // return response.json({ Usercontactdata: usercontact });
    try {
        await UserContact.create({
            stationId: "DBEC",
            number: "9752493789",
            name: "TMG SANDEEP GUPTA",
        });
        return response.send({ status: 200, message: 'contact insertd Succefully', });
    } catch (error) {
        return response.status(500).send({ status: 500, message: 'Error inserting data', error });
    }
}

const insertNumber = async (request: Request, response: Response) => {
    const data = request.body
    console.log("body line ==[ 100 ]==>", { Data: data, Name: data.name, Phone: data.number, lobby: data.lobby })

    try {
        const User_exist = await UserContact.findOne({ number: data.number })
        if (User_exist) {

            return response.status(500).send({ status: 500, message: 'User already exist', User: User_exist });
            return response.send({ status: 200, message: 'User already exist', User: User_exist });

        } else {
            await UserContact.create({
                stationId: data.lobby,
                number: data.number,
                name: data.name,
            })
            return response.send({ status: 200, message: 'contact insertd Succefully', });
        }
    } catch (error) {
        return response.status(500).send({ status: 500, message: 'Error inserting data', error });
    }

}

const getlobbycode = async (request: Request, response: Response) => {
    const data = request.body
    const division = await Division.find({ lobbyId: data.Station });
    return response.send({ status: 200, lobby: `${data.Station}`, Diisiondata: division });
};

const adminContact = async (request: Request, response: Response) => {
    const data = request.body
    console.log("data=", data);
    const usercontact = await UserContact.find({ stationId: data.lobbycode })
    return response.send({ status: 200, usercontact: usercontact });

}

const InserDatabyFile = async (request: Request, response: Response) => {
    try {
        const file = request.file;
        if (file) {
            const workbook = xlsx.read(file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const DataToInsert = xlsx.utils.sheet_to_json(sheet); // Array of JSON

            const matchedNumber: (Document<unknown, {}, UserContact> & Omit<UserContact & Required<{ _id: string; }>, never>)[] = [];
            let insertedCount = 0;
            let uninsertedCount = 0;
            const insertPromises = DataToInsert.map(async (item: any) => {
                if (item) {
                    const matchnumber = await UserContact.findOne({ number: item.number });
                    if (matchnumber) {
                        matchedNumber.push(matchnumber);
                        uninsertedCount++
                    } else {
                        await UserContact.create({
                            stationId: item.stationId,
                            number: item.number,
                            name: item.name,
                        });
                        insertedCount++
                    }
                }
            });

            // Wait for all database operations to complete
            await Promise.all(insertPromises);

            return response.send({
                status: 200,
                message: 'Contacts already exists',
                matchedNumber: matchedNumber,
                uninsertedNumber: uninsertedCount,
                insertedCount:insertedCount
            });
        } else {
            return response.status(400).send({ status: 400, message: 'No file uploaded' });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        return response.status(500).send({ status: 500, message: 'Internal server error' });
    }
};


export const Dashboard = {
    Listlobby,
    Updatelobby,
    insertlobby,
    insertdata,
    Deletedlobby,
    Usercontact,
    insertNumber,
    getlobbycode,
    adminContact,
    InserDatabyFile
}