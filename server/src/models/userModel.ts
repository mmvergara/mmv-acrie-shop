import { postgrePool } from "../db/postgre";

export class userModel {
  constructor() {}

  static async register(username: string, email: string, password: string) {
    return await postgrePool.query(
      `INSERT INTO users (username,email,password) VALUES (${username},${email},${password})`
    );
  }

  static async findByEmail(email: string) {
    return await postgrePool.query(`SELECT * FROM user WHERE email = ${email}`);
  }

  static async findByUsername(username: string) {
    return await postgrePool.query(`SELECT * FROM user WHERE username = ${username}`);
  }

  static async findById(id: number) {
    return await postgrePool.query(`SELECT * FROM user WHERE id = ${id}`);
  }
}
