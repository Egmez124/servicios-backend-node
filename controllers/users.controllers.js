import db from "../services/db.services.js";

export const getUser = async (req, res, next) => {
    try {
        const users = await db.findAll();
        res.json(users)
    } catch (error) {
        next(error);
    }
}

export const getUserById = async(req, res, next) => {
    try {
        const {id} = req.params
        const user = await db.findById(parseInt(id));
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const {firstname, lastname, email} = req.body;
        const newUser = await db.create({firstname, lastname, email});
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const userUpdated = await db.update(req.body, parseInt(id));
        res.json(userUpdated);
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await db.delete(parseInt(id));
        res.json(user);
    } catch (error) {
        next(error);
    }
}
