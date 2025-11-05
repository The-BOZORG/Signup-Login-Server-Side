import db from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const UserModel = {
  async create(userData) {
    const user = {
      id: uuidv4(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
      token: null,
    };

    db.data.users.push(user);
    await db.write();
    return user;
  },

  getAll() {
    return db.data.users;
  },

  findByEmail(email) {
    return db.data.users.find((u) => u.email === email);
  },

  async updateToken(id, token) {
    const user = db.data.users.find((u) => u.id === id);
    if (user) {
      user.token = token;
      await db.write();
    }
    return user;
  },
};
