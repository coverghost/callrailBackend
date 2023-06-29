import { Router } from "express";
import { contact, home,Login,insertdata} from "./Auth.tsx/AuthCotroller";

const router = Router();

router.post('/login-by-number',insertdata)
router.post('/get-all-Division',home)
router.post('/get-user-contact',contact)





export default router;
