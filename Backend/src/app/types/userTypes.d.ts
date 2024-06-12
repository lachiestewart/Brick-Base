type User = {
    _id?: import('mongodb').ObjectId
    username: string
    email: string
    password?: string
    firstName?: string
    lastName?: string
    birthDate?: Date
    profilePictureUrl?: string
}