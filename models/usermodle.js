import db from '../db.js';

export const UserModel = {
  async create(userData) {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
    };

    db.data.users.push(user);
    await db.write(); //
    return user;
  },

  getAll() {
    return db.data.users;
  },

  findByEmail(email) {
    return db.data.users.find((u) => u.email === email);
  },
};
