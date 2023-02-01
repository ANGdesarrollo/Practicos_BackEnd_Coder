import ContainerMongo from '../../container/mongoContainer.js';
import UserModel from '../../models/user.js';

export class ContainerMongoDaos extends ContainerMongo {
    constructor() {
        super(UserModel);
    }
}
