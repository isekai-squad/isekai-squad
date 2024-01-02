import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import postsRoute from "./router/Posts_route"
import servicesRoute from "./router/Services_route"
import reportsRoute from "./router/Reports_route"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/Content", postsRoute);
app.use("/Services" , servicesRoute);
app.use("/Reports" , reportsRoute);
app.listen(process.env.PORT, () => {
  console.log(
    `Neverr GIVEEEE upppppppppppppppp http://localhost:${process.env.PORT}`
  );
});
