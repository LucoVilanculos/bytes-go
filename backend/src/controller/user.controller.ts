import { Request, Response,NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { UserProps } from '../types/userprops';
import { User } from '../models/user.models'

export const register = async (req:Request, res:Response) => {
  try {
    const body:UserProps = req.body;
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "There is already a user registered with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An internal server error has occurred", error });
  }
};

export const getMe =(req:Request,res:Response)=> {
  try {
    res.status(200).json((req as any ).user)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching user data" })
  }
}




