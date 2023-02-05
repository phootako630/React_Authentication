import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
   path: "/api/test-email",
   method: "post",
    handler: async (req, res) => {
       try {
           await sendEmail({
                to: 'ivanzhang220820+test1@gmail.com',
                from: 'ivanzhang220820@gmail.com',
                subject: 'Capital one interview invitation',
                text: 'Hello Yifan, you have been invited to a Capital One interview. Please check your email for more details.',
           });
              res.status(200).json({message: 'Email sent'});
       } catch (e) {
              res.status(500).json({message: 'Error sending email'});
       }
    }
}