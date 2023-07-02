import express, { Request, Response } from "express";
import { Division } from "../modals/Divison";
import { UserContact } from "../modals/Station";
import multer from 'multer'
import xlsx from 'xlsx';

export const Login = async (request: Request, response: Response) => {
  const data = request.body.usernumber
  // try {
  //   await Division.create({
  //     lobbyId: "BSP",
  //     code: "BSP",
  //     name: "bilashpur",
  //   },{
  //     lobbyId: "BSP",
  //     code: "SDL",
  //     name: "shahdol",
  //   }
  //   )
  //   return response.json({ message: "user created" });
  // } catch (error) {
  //   return response.json({ Error: error });
  // }
  const division = await UserContact.find({
    number: data
  }).count();
  if (division === 0) {
    return response.json({ message: "userNotFound" });
  } else {
    const userdetail = await UserContact.find({
      number: data
    })
    return response.json({ Diisiondata: userdetail });
  }
};

export const home = async (request: Request, response: Response) => {
  const data = request.body.selectedLobby
  const division = await Division.find({ lobbyId: data });
  return response.json({ Diisiondata: division });
};


export const contact = async (request: Request, response: Response) => {
  const data = request.body.selectedLobby
  const start_date = new Date();
  console.log("START TIME --------->", start_date)
  const usercontact = await UserContact.find({ stationId: data })
  console.log("END TIME --------->", new Date());
  return response.json({ Usercontactdata: usercontact });
}


export const insertdata = async (request: Request, response: Response) => {

  let data_delete = false


  if (data_delete) {
    try {
      await UserContact.deleteMany();
      return response.send({ status: 200, message: 'data deleted success' });
    } catch (error) {
      return response.status(500).send({ status: 500, message: 'Error inserting data', error });
    }
  } else {
    const csvfile = xlsx.readFile('C:/Users/ayush/Downloads/phonebook (7).xlsx')

    const sheet = csvfile.Sheets['call']
    const P_JSON = xlsx.utils.sheet_to_json(sheet)

    try {
      const result = await UserContact.insertMany(P_JSON);
      if (result.length > 0) {
        return response.send({ status: 200, message: 'success', count: result.length });
      } else {
        return response.send({ status: 201, message: 'no data found', count: result.length });
      }
    } catch (error) {
      return response.status(500).send({ status: 500, message: 'Error inserting data', error });
    }
  }
}


export const insertlobby = async (request: Request, response: Response) => {
  try {
    await Division.create({});
    return response.send({ status: 200, message: 'success' });
  } catch (error) {
    return response.status(500).send({ status: 500, message: 'Error inserting data', error });
  }
}