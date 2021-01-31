export class User {
    user_id = null;
    display_name = null;
    image = null;

    constructor(user_id, display_name, image) {
        this.user_id = user_id;
        this.display_name = display_name;
        this.image = image;
    }
}