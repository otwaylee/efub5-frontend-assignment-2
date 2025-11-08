import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json("허용되지 않은 요청 방식입니다.");
  }

  const { id, pw } = JSON.parse(req.body);

  const client = await connectDB;
  const db = client.db(process.env.NEXT_PUBLIC_DB_NAME);

  const existingUser = await db.collection("user").findOne({ id });

  if (existingUser) {
    return res.status(400).json("이미 존재하는 아이디입니다.");
  }

  await db.collection("user").insertOne({
    id,
    pw,
    createdAt: new Date()
  });

  return res.status(200).json("회원가입 성공!");
}
