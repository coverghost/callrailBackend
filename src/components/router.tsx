import { Router } from "express";
import { contact, home} from "./Auth.tsx/AuthCotroller";

const router = Router();

router
router.post('/get-all-Division',home)
router.post('/get-user-contact',contact)





export default router;
