import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import { userRoutes } from "./router/user_router";

const app = express();
app.use(cors());
app.use(express.json());

// ===================================Ahmed==============================
// import Routes
import forumPost from "./router/forum_post_route";
import forumComment from "./router/forum_comment_route";
import notification from "./router/notification_route";

app.use("/forumPost", forumPost);
app.use("/forumComment", forumComment);
app.use("/notification", notification);
// ===================================Ahmed==============================

app.listen(process.env.PORT, () => {
  console.log(
    `Neverr GIVEEEE upppppppppppppppp http://localhost:${process.env.PORT}`
  );
});

app.use('/api',userRoutes)
