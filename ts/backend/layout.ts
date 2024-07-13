import {ILayoutManager} from "./backend";
import {BasePlugin} from "../utils/plugin";

export class GridLayoutManager extends BasePlugin implements ILayoutManager {
    constructor() {
        super('grid');
    }
}

