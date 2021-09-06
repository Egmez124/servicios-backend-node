import {Router} from "express";
import {getUser, getUserById, createUser, updateUser, deleteUser} from "../controllers/users.controllers.js"
const routes = Router();

routes.get("/users", getUser);
routes.get("/users/:id", getUserById);
routes.post("/users", createUser);
routes.put("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

export default routes;