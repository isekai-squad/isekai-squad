import express from "express";
import cors from "cors";
import { config } from "dotenv";
import {router} from "./controller/stripe"
config();

const app = express();
app.use(cors());
app.use(express.json());
import favotitRouter from "./router/favorite_route"
// import stripe from "./router/stripe_route"
// import basket  from "../server/router/basket"




app.use("/favorit",favotitRouter )
// app.use("/baskets", basket);
// app.use("/stripe",stripe)
app.use("/api",router)

app.listen(process.env.PORT, () => {
  console.log(
    `Neverr GIVEEEE upppppppppppppppp http://localhost:${process.env.PORT}`
  );
});

