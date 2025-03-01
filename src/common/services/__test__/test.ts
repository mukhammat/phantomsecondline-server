import {NotificationService} from "../notification.service";

const notificationService = new NotificationService();
const userFcmToken = "1:981791670919:ios:1cbbe33e257e54f815ae22"; // Полученный от iOS-приложения

export async function a () {
    await notificationService.sendPushNotification(
        userFcmToken,
        "Входящий звонок",
        "Иван звонит вам",
        { callId: "12345", callerName: "Иван" }
    );
}
