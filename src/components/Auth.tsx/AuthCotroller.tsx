import express, { Request, Response } from "express";
import { Division } from "../modals/Divison";
import { UserContact } from "../modals/Station";

export const Login = async (request: Request, response: Response) => {
  const data = request.body.usernumber
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
  const usercontact = await UserContact.find({ stationId: data })
  return response.json({ Usercontactdata: usercontact });
}

export const checknumberindb = async (request: Request, response: Response) => {
  try {
    const userdetail = await UserContact.find({
      number: { $in: ["9752444254", "9752441332", "9752442770", "9752442186", "9340389833", "8770414079", "9752442111", "9752441745", "9752991337", "9752442217", "9752441615", "9752441644", "9752442778", "9752442765", "9752442229", "9752441398", "9300121402", "9752442144"]
    }
    })
    return response.status(200).json({ status: 200, Diisiondata: userdetail, message: 'success' });
  } catch (error) {
    return response.status(500).json({ status: 500, message: 'Error inserting data', error });
  }
}



