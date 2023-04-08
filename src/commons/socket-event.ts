export enum SocketEvent {
    // Forum
    UpdateForum = 'updateForum',
    DeleteForum = 'deleteForum',
    CreateComment = 'createComment',
    UpdateComment = 'updateComment',
    DeleteComment = 'deleteComment',

    // Notification
    CreateNotification = 'createNotification',
    UpdateNotification = 'updateNotification',
    DeleteNotification = 'deleteNotification',
    ReadNotification = 'readNotification',
    RefreshNotification = 'refreshNotification',

    // Admin
    UserConnect = 'userConnected',
    UserUpdate = 'userUpdated',
    UserDisconnect = 'userDisconnected',
    AdminConnect = 'adminConnected'
}
