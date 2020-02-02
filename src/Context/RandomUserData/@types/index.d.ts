interface IUserProfile {
    name: string;
    photo: string;
}

interface IFeed extends IUserProfile{
    images: Array<String>
    description: string;
}

