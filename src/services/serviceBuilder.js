import { GameService } from './gameService';
import { ErrorService } from './errorService';
import { UserService } from './userService';

export function buildServices() {
    return {
        gameService: new GameService(),
        errorService: new ErrorService(),
        userService: new UserService()
    };
}