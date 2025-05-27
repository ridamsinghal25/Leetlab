import { Liveblocks } from "@liveblocks/node";
import { getRandomColor } from "../libs/getRandomColor.js";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

export const liveblockAuth = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("Error in liveblockAuth: ", error);
    res.status(500).json({
      error: "Error in liveblockAuth",
      success: false,
    });
  }
};
