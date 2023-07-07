import { Router } from "express";
import { contact, home,Login,insertdata, insertlobby, checknumberindb} from "./Auth.tsx/AuthCotroller";

const router = Router();

router.post('/login-by-number',Login)
router.post('/get-all-Division',home)
router.post('/get-user-contact',contact)

//for super admin
router.post('/insert-number-by-excel',insertdata)
router.post('/insert-lobby',insertlobby)
router.post('/serch-number-by-array',checknumberindb)




export default router;
