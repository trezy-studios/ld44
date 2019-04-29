const initialState = {
  controls: {
    pause: {
      isActive: false,
      type: 'toggle',
    },
  },

  currentGameStateID: null,

  debug: {
    enabled: false,
  },

  hotbars: {},

  inventory: {
    items: [],
    totalQuantity: 0,
    totalSlots: 16,
    totalWeight: 0,
  },

  memories: {
    memoryStore: {},
    shouldStartCapture: false,
  },

  saves: {},
}





export default initialState
