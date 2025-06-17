import { Request, Response,NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { UserProps, CarInfo, UserRole } from '../types/userprops'
import { User } from '../models/user.models'

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      bairro,
      genero,
      car
    } = req.body as UserProps & { car?: CarInfo };

    // Checa se já existe usuário
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "There is already a user registered with this email." });
      return;
    }

    // Validação comum
    if (!name || !email || !password || !role || !phone || !bairro || !genero) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    // Validação por role
    if (role === "driver") {
      if (
        !car ||
        !car.brand ||
        !car.carModel ||
        !car.year ||
        !car.color ||
        !car.plateNumber
      ) {
        res.status(400).json({ message: "Driver must provide all car details except imageUrl." });
        return;
      }
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Monta dados do usuário conforme o type
    const userData: UserProps = {
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      bairro,
      genero,
      isActive: true,
      car: role === "driver" ? car : undefined,
    } as UserProps;

    const user = await User.create(userData);

    // Mensagem de boas-vindas (simulação)
    console.log(`Bem-vindo ao Bytes, ${name}! Email: ${email} ou WhatsApp: ${phone}`);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error has occurred", error });
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User updated", user });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

export const patchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User patched", user });
    }
  } catch (error) {
    res.status(500).json({ message: "Error patching user", error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = (req as any).user;

    if (reqUser.role === "admin") {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    } else if (reqUser._id === id) {
      const { password } = req.body;
      if (!password) {
        res.status(400).json({ message: "Password is required to delete your account" });
      } else {
        const user = await User.findById(id);
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            res.status(401).json({ message: "Incorrect password" });
          } else {
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "User deleted successfully" });
          }
        }
      }
    } else {
      res.status(403).json({ message: "You are not authorized to delete this user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};



