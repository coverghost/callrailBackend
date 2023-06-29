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