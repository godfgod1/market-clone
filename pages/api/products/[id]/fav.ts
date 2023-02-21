import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { query:{id}, 
  session:{user} } 
  =req
  const alreadyExists = await client.fav.findFirst({
    where:{
      // 어떤 유저가 라이크했는지와 어떤 물건을 라이크 했는지 필요함
      productId:+id!?.toString(),
      userId:user?.id
    }
  })
  if(alreadyExists){
    // delete
    await client.fav.delete({
      where:{
        id:alreadyExists.id
      }
    })
  }else{
    //create
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id!.toString(),
          },
        },
      },
    })
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
