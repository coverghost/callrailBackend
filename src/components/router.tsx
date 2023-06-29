import { Router } from "express";
import { contact, home,Login} from "./Auth.tsx/AuthCotroller";

const router = Router();

router.post('/login-by-number',Login)
router.post('/get-all-Division',home)
router.post('/get-user-contact',contact)





export default router;
