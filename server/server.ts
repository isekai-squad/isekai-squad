import express from "express";
import cors from "cors";
import { config } from "dotenv";
// import favotitRouter from "./router/favorite_route"
// import basket  from "../server/router/basket"
config();
import { userRoutes } from "./router/user_router";
import postsRoute from "./router/Posts_route"
import servicesRoute from "./router/Services_route"
import reportsRoute from "./router/Reports_route"

const app = express();
app.use(cors());
app.use(express.json());





// app.use("/favorit",favotitRouter )
// app.use("/baskets", basket);
// app.use("/stripe",stripe)
// app.use("/api",router)

// ===================================Ahmed==============================
// import Routes
import forumPost from "./router/forum_post_route";
import forumComment from "./router/forum_comment_route";
import notification from "./router/notification_route";

app.use("/forumPost", forumPost);
app.use("/forumComment", forumComment);
app.use("/notification", notification);
// ===================================Ahmed==============================

//===============================Adam====================================
app.use('/api',userRoutes)














//===============================Adam=====================================
//===============================Ameur====================================

import favotitRouter from "./router/favorite_route"
// import stripe from "./router/stripe_route"
// import basket  from "../server/router/basket"
import {router} from "./controller/stripe"













//===============================Ameur=====================================
//===============================Hasan====================================
app.use('/Posts' , postsRoute);
app.use('/Services', servicesRoute);
app.use('/Reports' , reportsRoute)











//===============================Hasan=====================================
app.listen(process.env.PORT, () => {
  console.log(
    `Neverr GIVEEEE upppppppppppppppp http://localhost:${process.env.PORT}`
  );
});


