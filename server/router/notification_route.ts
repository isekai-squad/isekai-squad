import express from "express";
import * as notification_controller from "../controller/notification_controller";
const notificationRouter = express.Router();

notificationRouter.get(
  "/:to",
  notification_controller.getAllNotificationsForUser
);

notificationRouter.put(
  "/:notificationId",
  notification_controller.updateNotificationsSeenForUser
);

notificationRouter.post("/", notification_controller.addNotification);

export default notificationRouter;
