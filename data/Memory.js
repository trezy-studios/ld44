import config from "../game.config";


let MEMORY_MAX_INSTANCES = 0;


class Memory{
    constructor(){
        if(MEMORY_MAX_INSTANCES>config.MEMORY.MAX_INSTANCES)throw config.ERRORS.MEMORY.MEMORY_LIMIT_EXCEDED
        MEMORY_MAX_INSTANCES++;
        this.movie = new Blob();
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
    destroy(){
        MEMORY_MAX_INSTANCES--;
        delete this
    }
    static hasSpaceLeft(){
        return MEMORY_MAX_INSTANCES <= config.MEMORY.MAX_INSTANCES;
    }
}
export default Memory