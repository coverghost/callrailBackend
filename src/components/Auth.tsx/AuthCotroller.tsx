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
  const usercontact = await UserContact.find({ stationId: data })
  return response.json({ Usercontactdata: usercontact });
}


export const insertdata = async (request: Request, response: Response) => {

  // try {
  //   await UserContact.deleteMany();
  //   return response.send({ status: 200, message: 'success' });
  // } catch (error) {
  //   return response.status(500).send({ status: 500, message: 'Error inserting data', error });
  // }

  const csvfile = xlsx.readFile('C:/Users/ayush/Downloads/phonebook (2).xlsx')

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


export const insertlobby = async (request: Request, response: Response) => {
  try {
    await Division.create({

      lobbyId: "BSP",
      code: "BSP",
      name: "bilashpur"
    }, {

      lobbyId: "BSP",
      code: "SDL",
      name: "shahdol"
    }
      , {

        lobbyId: "BSP",
        code: "BJRI",
        name: "bijri"
      }, {

      lobbyId: "BSP",
      code: "BRJN",
      name: ""
    }, {

      lobbyId: "BSP",
      code: "KGS",
      name: ""
    }, {

      lobbyId: "BSP",
      code: "PMD",
      name: ""
    }, {

      lobbyId: "BSP",
      code: "USL",
      name: ""
    }, {

      lobbyId: "BSP",
      code: "KRBA",
      name: ""
    }, {

      lobbyId: "BSP",
      code: "KDTR",
      name: ""
    },{

      lobbyId: "BSP",
      code: "KHS",
      name: ""
    }  ,{

      lobbyId: "BSP",
      code: "KJZ",
      name: ""
    }  ,{

      lobbyId: "BSP",
      code: "LKCB",
      name: ""
    }  ,{

      lobbyId: "BSP",
      code: "RIG",
      name: ""
    }  ,{

      lobbyId: "BSP",
      code: "SJQ",
      name: ""
    }  ,{

      lobbyId: "RAIPUR",
      code: "BYT",
      name: ""
    }  ,{

      lobbyId: "RAIPUR",
      code: "DBLE",
      name: ""
    }  ,{

      lobbyId: "RAIPUR",
      code: "DRZ",
      name: ""
    }  ,{

      lobbyId: "RAIPUR",
      code: "DURG",
      name: ""
    }  ,{

      lobbyId: "RAIPUR",
      code: "R",
      name: ""
    }  ,{

      lobbyId: "RAIPUR",
      code: "RSD",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "BTC",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "CWA",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "DGG",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "G",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "JESG",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "KAV",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "MIB",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "MAB",
      name: ""
    } ,{

      lobbyId: "NAGPUR",
      code: "NGPS",
      name: ""
    },{

      lobbyId: "NAGPUR",
      code: "NIR",
      name: ""
    },{

      lobbyId: "NAGPUR",
      code: "SCLN",
      name: ""
    },{

      lobbyId: "NAGPUR",
      code: "TMR",
      name: ""
    }

    );
    return response.send({ status: 200, message: 'success' });
  } catch (error) {
    return response.status(500).send({ status: 500, message: 'Error inserting data', error });
  }
}