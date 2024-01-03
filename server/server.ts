import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import { userRoutes } from "./router/user_router";

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(
    `Neverr GIVEEEE upppppppppppppppp http://localhost:${process.env.PORT}`
  );
});

app.use('/api',userRoutes)
