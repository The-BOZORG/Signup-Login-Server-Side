import { UserModel } from '../models/usermodle.js';

export const registerUserCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = UserModel.findByEmail(email);
    if (userExist) {
      return res
        .status(400)
        .json({ status: 'fail', msg: 'user already exists' });
    }
    const user = await UserModel.create({ username, email, password });
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
    const userFound = UserModel.findByEmail(email);
    if (!userFound) {
      return res.status(404).json({ status: 'fail', msg: 'user not found' });
    }
    res.json({
      status: 'success',
      msg: 'login successful',
      data: userFound,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
};
