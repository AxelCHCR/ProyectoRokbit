import axios from 'axios';
class NotificationsController{
    async updateNotificationsSettings(updateUserRoute: string,createNotificationRoute: String, userId: String, status: Boolean, frequency: String)
    {
        const response = await axios.put(updateUserRoute, userId)
    }
}