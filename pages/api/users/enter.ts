
import mail from "@sendgrid/mail"
import client from '@libs/server/client';
import withHandler,{ResponseType} from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from "next";
import twilio from 'twilio';
import me from './me';

// mail.setApiKey(process.env.SENDGRID_KEY!);
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

mail.setApiKey(process.env.SENDGRID_API_KEY!);
const twilioClient = twilio(process.env.TWILO_SID, process.env.TWILO_TOKEN)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {

  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
if (phone) {
  // const message = await twilioClient.messages.create({
  //   messagingServiceSid:process.env.MS_SID,
  //   to: process.env.PHONE_NUMBER!,
  //   body: `Your login token is ${payload}.`,
  // });
  // console.log(message);
}else if(email){
  // const email = await mail.send({
  //   from:"godfgod3@gmail.com",
  //   to:"godfgod3@gmail.com",
  //   subject:"Your market clone Verification email",
  //   text:`your token is ${payload}`,
  //   html:`<strong>your token is ${payload}</strong>`
  // })
  // console.log('email',email)
}
return res.json({
  ok:true,

})
  // const user = phone ? { phone } : email ? { email } : null;
  // if (!user) return res.status(400).json({ ok: false });
  // const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // const token = await client.token.create({
  //   data: {
  //     payload,
  //     user: {
  //       connectOrCreate: {
  //         where: {
  //           ...user,
  //         },
  //         create: {
  //           name: "Anonymous",
  //           ...user,
  //         },
  //       },
  //     },
  //   },
  // });
  // if (phone) {
  //   /*  const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}.`,
  //   });
  //   console.log(message); */
  // } else if (email) {
  //   /* const email = await mail.send({
  //     from: "nico@nomadcoders.co",
  //     to: "nico@nomadcoders.co",
  //     subject: "Your Carrot Market Verification Email",
  //     text: `Your token is ${payload}`,
  //     html: `<strong>Your token is ${payload}</strong>`,
  //   });
  //   console.log(email); */
  // }
  // return res.json({
  //   ok: true,
  // });
  
}

// export default handler
export default withHandler({ methods: ["GET"], handler,} );
// export default withHandler({ methods: ["POST"], handler, isPrivate: false });
