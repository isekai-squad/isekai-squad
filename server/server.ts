import express from "express";
import cors from "cors";
import { config } from "dotenv";
import favotitRouter from "./router/favorite_route.ts"
// import basket  from "../server/router/basket"
config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/favorit",favotitRouter )
// app.use("/baskets", basket);



app.listen(process.env.PORT, () => {
  console.log(
    `Neverr GIVEEEE upppppppppppppppp http://localhost:${process.env.PORT}`
  );
});

