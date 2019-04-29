// Module imports
import Phaser, {
  Game,
  WEBGL,
} from 'phaser'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LocalForage from 'localforage'
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import {
  actions,
} from '../store'
import config from '../game.config'
import BootScene from '../scenes/BootScene'
import PreloaderScene from '../scenes/PreloaderScene'
import TitleScene from '../scenes/ui/TitleScene'
import LevelNub from '../scenes/levels/LevelNub'





// Local constants
const mapDispatchToProps = dispatch => bindActionCreators({
  addMemory: actions.memories.addMemory,
  stopMemoryCapture: actions.memories.stopMemoryCapture,
}, dispatch)
const mapStateToProps = ({ memories: { shouldStartCapture } }) => ({ shouldStartCapture })





@connect(mapStateToProps, mapDispatchToProps)
class GameComponent extends React.Component {
  /***************************************************************************\
    Static Properties
  \***************************************************************************/

  static propTypes = {
    addMemory: PropTypes.func.isRequired,
    shouldStartCapture: PropTypes.bool.isRequired,
    stopMemoryCapture: PropTypes.func.isRequired,
  }





  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  captureMimetype = null

  mimetypes = [
    'video/webm',
    'video/webm,codecs=vp9',
    'video/vp8',
    'video/webm;codecs=vp8',
    'video/webm;codecs=daala',
    'video/webm;codecs=h264',
    'video/mpeg',
  ]

  recordedBlobs = []





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  // `_captureMemory` is triggered when we want to store a memory, but we
  // actually want to save the action on either side of the event that
  // triggered the memory. To do that, we set a timeout and don't grab the
  // recorded data until a while after the event.
  _captureMemory = () => {
    const {
      addMemory,
      stopMemoryCapture,
    } = this.props

    const wait = config.MEMORY.MAX_DURATION

    setTimeout(async () => {
      const memory = new Blob([...this.recordedBlobs], { type: this.captureMimetype })
      const memoryID = addMemory()

      const memoryAsDataURL = await new Promise(resolve => {
        const fileReader = new FileReader()
        fileReader.onload = ({ target: { result } }) => resolve(result)
        fileReader.readAsDataURL(memory)
      })

      LocalForage.setItem(memoryID, memoryAsDataURL)
    }, wait)

    stopMemoryCapture()
  }

  _handleMediaRecorderData = ({ data }) => {
    // Clamp the recording so it's never longer than our max duration
    while (this.recordedBlobs.length >= (config.MEMORY.MAX_DURATION / 1000)) {
      this.recordedBlobs.shift()
    }

    // Jam the latest blob onto the end of the `recordedBlobs` array
    if (data && data.size > 0) {
      this.recordedBlobs.push(data)
    }
  }

  _startRecording = () => {
    this.mimetypes.some(type => {
      if (MediaRecorder.isTypeSupported(type)) {
        this.captureMimetype = type
        return true
      }

      return false
    })

    if (!this.captureMimetype) {
      console.log('No supported type found for MediaRecorder')
    }

    if (!this.mediaStream) {
      this.mediaStream = this.canvasElement.captureStream()
    }

    if (!this.mediaRecorder) {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: this.captureMimetype,
        videoBitsPerSecond: 2500000, // 2.5Mbps
      })
    }

    this.mediaRecorder.ondataavailable = this._handleMediaRecorderData

    this.mediaRecorder.start(100)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    this._startRecording()

    this.game = new Game({
      canvas: this.canvasElement,
      type: WEBGL,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { y: 400 },
        },
      },
      scale: {
        height: window.innerHeight,
        mode: Phaser.Scale.RESIZE,
        parent: document.querySelector('[role=application]'),
        width: window.innerWidth,
      },
      scene: [
        BootScene,
        PreloaderScene,
        TitleScene,
        LevelNub,
      ],
    })
  }

  componentDidUpdate (prevProps) {
    const { shouldStartCapture } = this.props

    if (prevProps.shouldStartCapture !== shouldStartCapture) {
      if (shouldStartCapture) {
        this._captureMemory()
      }
    }
  }

  constructor (props) {
    super(props)
    this.canvas = React.createRef()
  }

  render () {
    return (
      <>
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <canvas ref={this.canvas} />
        {/* eslint-enable */}
      </>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get canvasElement () {
    return this.canvas.current
  }
}





export { GameComponent }
