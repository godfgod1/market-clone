import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from '@libs/server/withSession';
// import { withApiSession } from "@libs/server/withSession";




async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (!req.session.user) {
    res.json({ ok: true })
  }
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  })
  console.log(profile)
  res.json({
    ok: true,
    profile
  })

}
export default withApiSession(withHandler({ methods:[ "GET"], handler}))

