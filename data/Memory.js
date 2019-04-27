import config from "../game.config";
import { isDate } from "util";
class Memory{
    constructor(){
        this.movie = null;
        this.maxValue = 1;
        this.currentValue = 1;
        this.event = "none";
        this.effect = "none";
        this._capture_start_time_ms = null;
    }

    get canCapture(){
        return (this._capture_start_time_ms+config.MEMORY_MAX_LENGTH_MS)>=performance.now();
    }
    startCapture(){
        this._capture_start_time_ms = performance.now();
    }
    getMovieFrame(index){}
    
}
export default Memory