import { GameService } from './gameService';
import { ErrorService } from './errorService';

export function buildServices() {
    return {
        gameService: new GameService(),
        errorService: new ErrorService()
    };
}