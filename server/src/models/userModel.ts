import { postgrePool } from "../db/postgre";
import { userInfo } from "../types";

export class userModel {
  username = "";
  email = "";
  password = "";
  userpic_url = "";
  id: null | number = null;
  constructor(userInfo: userInfo) {
    this.username = userInfo.username;
    this.email = userInfo.email;
    this.password = userInfo.password;
    this.userpic_url =
      userInfo.userpic_url ||
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    this.id = userInfo.id || null;
  }

  async save() {
    if (this.id) {
      //Update usercredentials
      const q = `UPDATE users SET 
      username = '${this.username}',
      email = '${this.email}',
      password = '${this.password}',
      userpic_url = '${this.userpic_url}'
      WHERE id = ${this.id}`;
      return await postgrePool.query(q);
    } else {
      console.log("SAVING");
      //Register
      const q = `INSERT INTO users (username,email,password,userpic_url) 
                  VALUES ('${this.username}','${this.email}','${this.password}','${this.userpic_url}')`;
      return await postgrePool.query(q);
    }
  }

  async destroy() {
    if (!this.id) throw new Error("This model have not been saved in the database yet");
    return await postgrePool.query(`DELETE FROM users WHERE id = ${this.id}`);
  }

  static async findByEmail(email: string) {
    return await postgrePool.query(`SELECT * FROM users WHERE email = '${email}'`);
  }

  static async findByUsername(username: string) {
    return await postgrePool.query(`SELECT * FROM users WHERE username = '${username}'`);
  }

  static async findById(id: number) {
    return await postgrePool.query(`SELECT * FROM users WHERE id = '${id}'`);
  }
}
