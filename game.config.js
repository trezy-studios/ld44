const config = {
  MEMORY: {
    MAX_DURATION: 5000,
    MAX_INSTANCES: 5,
  },
  ERRORS: {
    MEMORY: {
      // This error will throw when the number of non deleted Memory instances excedes config.MEMORY.MAX_INSTANCES
      MEMORY_LIMIT_EXCEDED: new Error('memory limit exceded, please call Memory.hasSpaceLeft() to check if there is room left.'),
    },
  },
}





export default config
