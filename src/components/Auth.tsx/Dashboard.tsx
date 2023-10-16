import express, { Request, Response } from "express";
import { Division } from "../modals/Divison";
import { UserContact } from "../modals/Station";
import xlsx from 'xlsx';
import { Document } from "mongoose";



const Listlobby = async (request: Request, response: Response) => {
    const lobby = await Division.find()
    return response.json({ Lobby: lobby });
}

const totalLCAdmin = async (request: Request, response: Response) => {
    const BSP_Lobby = await Division.find({ lobbyId: "BSP" }).count()
    const RAIPUR_Lobby = await Division.find({ lobbyId: "RAIPUR" }).count()
    const NAGPUR_Lobby = await Division.find({ lobbyId: "NAGPUR" }).count()
    return response.status(200).send({ BSP_Lobby: BSP_Lobby, RAIPUR_Lobby: RAIPUR_Lobby, NAGPUR_Lobby: NAGPUR_Lobby })
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
    const lobbyData = request.body
    try {
        await Division.create({
            lobbyId: lobbyData.station,
            code: lobbyData.lobbyCode,
            name: lobbyData.name
        });
        return response.send({ status: 200, message: 'Lobby Created successfully...!' });
    } catch (error: any) {
        return response.status(500).send({ status: 500, message: error.errors.lobbyId.message });
    }
}

const Deletedlobby = async (request: Request, response: Response) => {
    const DataForDelete = request.body

    const lobbybyId = await Division.findOne({ _id: DataForDelete.id })
    try {
        const lobby = await Division.deleteOne({ _id: DataForDelete.id })
        await UserContact.deleteMany({ stationId: lobbybyId?.code })
        return response.status(200).send({ status: 200, message: "Lobby deleted successfully...!" });
    } catch (error) {
        return response.status(500).send({ status: 500, message: 'delete error', error });
    }
}


const insertNumber = async (request: Request, response: Response) => {
    const data = request.body

    try {
        const User_exist = await UserContact.findOne({ number: data.number })
        if (User_exist) {
            return response.status(500).send({ status: 500, message: 'User already exist', User: User_exist });
        } else {
            await UserContact.create({
                stationId: (data.lobby).trim(),
                number: (data.number).trim(),
                name: (data.name).trim(),
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
                insertedCount: insertedCount
            });
        } else {
            return response.status(400).send({ status: 400, message: 'No file uploaded' });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        return response.status(500).send({ status: 500, message: 'Internal server error' });
    }
};

const updateData = async (request: Request, response: Response) => {
    const DataForUpdate = request.body
    try {
        await UserContact.updateOne({ _id: DataForUpdate.UserId }, { $set: { stationId: DataForUpdate.stationId, number: DataForUpdate.number, name: DataForUpdate.name } })
        return response.send({ status: 200, usercontact: DataForUpdate });
    } catch (error) {
        return response.status(500).send({ status: 500, message: 'Internal server error' });
    }

}

const Deletedcontact = async (request: Request, response: Response) => {

    const DataForDelete = request.body
    if (DataForDelete.lobbyCode) {
        try {
            await UserContact.deleteMany({ stationId: DataForDelete.lobbyCode })
            return response.status(200).send({ status: 200, message: "all contact deleted successfully...!" });
        } catch (error) {
            return response.status(500).send({ status: 500, message: 'delete error', error });
        }
    } else {
        try {
            await UserContact.deleteOne({ _id: DataForDelete.id })
            return response.status(200).send({ status: 200, message: "contact deleted successfully...!" });
        } catch (error) {
            return response.status(500).send({ status: 500, message: 'delete error', error });
        }
    }

}

const profileChange = async (request: Request, response: Response) => {
    const profile = request.body;

    console.log("profile =>", profile)
}

const totalcontacts = async (request: Request, response: Response) => {
    try {
        const lobbyIdGet = await Division.distinct("lobbyId");

        const lobbyCode = await Promise.all(
            lobbyIdGet.map(async (lobbyId) => {
                const lobbyCodeId = await Division.find({ lobbyId });
                const codes = await Promise.all(
                    lobbyCodeId.map(async (data) => {
                        const count = await UserContact.find({ stationId: data.code }).count();
                        return { code: data.code, count };
                    })
                );
                return { station: lobbyId, codes };
            })
        );
        return response.status(200).send({ status: 200, lobbyCode: lobbyCode });
    } catch (error) {
        console.error("Error:", error);
        return response.status(500).send({ status: 500, error: "Internal Server Error" });
    }
}


export const Dashboard = {
    Listlobby,
    Updatelobby,
    insertlobby,
    Deletedlobby,
    insertNumber,
    getlobbycode,
    adminContact,
    InserDatabyFile,
    totalLCAdmin,
    updateData,
    Deletedcontact,
    profileChange,
    totalcontacts
}