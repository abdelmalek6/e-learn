import User from "../models/User.js";
import { Webhook } from "svix";

export const webhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.SVIX_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const user = {
          _id: data.id,
          email: data.email_addreses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imgUrl: data.image_url,
        };
        await User.create(user);
        res.json({});
        break;
      }

      case "user.updated": {
        const user = {
          _id: data.id,
          email: data.email_addreses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imgUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, user);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, error: "Invalid request" });
  }
};
