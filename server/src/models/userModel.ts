import { postgrePool } from "../db/postgre";
import { userInfo } from "../types";

export class userModel {
  username = "";
  email = "";
  password = "";
  id: null | number = null;
  constructor(userInfo: userInfo) {
    this.username = userInfo.username;
    this.email = userInfo.email;
    this.password = userInfo.password;
    this.id = userInfo.id || null;
  }

  async save() {
    if (this.id) {
      return await postgrePool.query(
        `UPDATE users SET username = ${this.username}, email = ${this.email}, password = ${this.password} WHERE id = ${this.id}`
      );
    } else {
      return await postgrePool.query(
        `INSERT INTO users (username,email,password) VALUES (${this.username},${this.email},${this.password})`
      );
    }
  }

  async destroy() {
    if (!this.id) throw new Error("This model have not been saved in the database yet");
    return await postgrePool.query(`DELETE FROM users WHERE id = ${this.id}`);
  }

  static async findByEmail(email: string) {
    return await postgrePool.query(`SELECT * FROM users WHERE email = ${email}`);
  }

  static async findByUsername(username: string) {
    return await postgrePool.query(`SELECT * FROM users WHERE username = ${username}`);
  }

  static async findById(id: number) {
    return await postgrePool.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}
