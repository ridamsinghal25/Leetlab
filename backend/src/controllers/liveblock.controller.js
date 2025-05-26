import { Liveblocks } from "@liveblocks/node";
import { getRandomColor } from "../libs/getRandomColor.js";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

export const liveblockAuth = async (req, res) => {
  const user = req.user;

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
    },
    {
      userInfo: {
        name: user?.name,
        color: getRandomColor(),
        image: user?.image,
      },
    }
  );

  return res.status(status).json(body);
};
