import { Router } from "express";
import { contact, home, Login, checknumberindb } from "./Auth.tsx/AuthCotroller";
import { Dashboard } from "./Auth.tsx/Dashboard";
const multer = require('multer');
const xlsx = require('xlsx');


const router = Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.post('/login-by-number', Login)
router.post('/get-all-Division', home)
router.post('/get-user-contact', contact)

//for super admin
router.post('/insert-number', Dashboard.insertNumber)
router.post('/insert-lobby', Dashboard.insertlobby)
router.get('/list-lobby', Dashboard.Listlobby)
router.post('/update-lobby', Dashboard.Updatelobby)
router.post('/delete-lobby', Dashboard.Deletedlobby)
router.post('/get-all-contacts', Dashboard.Usercontact)
router.post('/get-admin-Division', Dashboard.getlobbycode)
router.post('/get-admin-contact', Dashboard.adminContact)
router.post('/insert-by-file', upload.single('file'), Dashboard.InserDatabyFile)






router.post('/serch-number-by-array', checknumberindb)



export default router;
