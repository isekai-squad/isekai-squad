import express from "express";
import * as notification_controller from "../controller/notification_controller";
const notificationRouter = express.Router();

notificationRouter.get(
  "/:userId",
  notification_controller.getAllNotificationsForUser
);

notificationRouter.put(
  "/:notificationId",
  notification_controller.updateNotificationsSeenForUser
);

export default notificationRouter;
