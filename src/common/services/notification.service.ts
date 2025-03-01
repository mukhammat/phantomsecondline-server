import { messaging } from "@/common/config/firebase";

export class NotificationService {
    async sendPushNotification(token: string, title: string, body: string, data?: { [key: string]: string }) {
        const message = {
            token,
            notification: {
                title,
                body,
            },
            data,
        };

        try {
            const response = await messaging.send(message);
            console.log("Push notification sent:", response);
            return response;
        } catch (error) {
            console.error("Error sending push notification:", error);
        }
    }
}