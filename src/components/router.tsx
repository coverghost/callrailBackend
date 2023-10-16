import { Router } from "express";
import { contact, home, Login} from "./Auth.tsx/AuthCotroller";
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
router.post('/insert-by-file', upload.single('file'), Dashboard.InserDatabyFile) 
router.get('/list-lobby', Dashboard.Listlobby)
router.post('/insert-lobby', Dashboard.insertlobby)
router.post('/update-lobby', Dashboard.Updatelobby)
router.post('/delete-lobby', Dashboard.Deletedlobby)
router.post('/get-admin-Division', Dashboard.getlobbycode)
router.post('/get-admin-contact', Dashboard.adminContact)
router.get('/total-c-l-admin', Dashboard.totalLCAdmin)
router.post('/update-contact', Dashboard.updateData)
router.post('/delete-contact', Dashboard.Deletedcontact)



router.post('/profile-change', Dashboard.profileChange)
router.get('/total-contacts', Dashboard.totalcontacts)


 




export default router;
