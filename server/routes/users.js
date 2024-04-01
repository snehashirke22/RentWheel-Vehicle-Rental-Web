import express from "express" 
import { getUser, updateUser, getAllUsers, deleteUser } from "../controllers/userController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


router.get("/checkauthentication", verifyToken, (req,res,next)=>{
    res.send("Hello user, you are logged in");
});

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("Hello user, you are logged in and you can delete your account");
})
//update
router.put("/:id", updateUser);

//Get
router.get("/:id", getUser)

//Get All
router.get("/", getAllUsers);

//Delete
router.delete("/:id", deleteUser);



export default router;