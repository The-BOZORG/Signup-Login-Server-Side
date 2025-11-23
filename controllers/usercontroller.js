import { UserModel } from '../models/usermodle.js';
import bcrypt, { hash } from 'bcryptjs';
import tokenGenerate from '../utils/tokengenerate.js';


export const registerUserCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await UserModel.findByEmail(email);
    if (userExist) {
      return res
        .status(400)
        .json({ status: 'fail', msg: 'user already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: 'success',
      msg: 'user registered successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
};

export const loginUserCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await UserModel.findByEmail(email);
    if (userFound && (await bcrypt.compare(password, userFound.password))) {
      const token = tokenGenerate(userFound.id);
      await UserModel.updateToken(userFound.id, token);
      res.json({
        status: 'success',
        msg: 'login successful',
        data: userFound,
        token,
      });
    } else {
      return res.status(404).json({ status: 'fail', msg: 'user not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
};