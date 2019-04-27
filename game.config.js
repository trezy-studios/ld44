export default config = {
    MEMORY:{
        MAX_DURATION:5000,
        MAX_INSTANCES:5
    },
    errors:{
        MEMORY:{
            MEMORY_LIMIT_EXCEDED:new Error("memory limit exceded, please call Memory.hasSpaceLeft() to check if there is room left.")
        }
    }
};