
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from '@libs/server/withSession';
import { exists } from 'fs';




async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {

  // 토큰을 받고
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include:{user:true}
  });
  if (!foundToken) return res.status(404).end();
  // 토큰을 받은 아이디를 찾는다
  req.session.user = {
    id:foundToken.userId,
  }
  // 토큰을 세션에 저장
  await req.session.save()
  // 앞에서 사용한 토큰을 삭제시킨다.
  // 왜냐면 토큰은 암호화되어야 하기 때문이다
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({ ok: true });
}

export default withHandler({ method: "POST", handler,} );

