// Module imports
import Phaser, {
  Game,
  WEBGL,
} from 'phaser'
import React from 'react'

// Boot scenes
import BootScene from '../scenes/BootScene'
import PreloaderScene from '../scenes/PreloaderScene'

// UI scenes
import TitleScene from '../scenes/ui/TitleScene'

// Levels / areas
import LevelNub from '../scenes/levels/LevelNub'

class GameComponent extends React.Component {
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
  // actually want to save the 15 seconds of action on either side of the event
  // that triggered the memory. To do that, we set a timeout and don't grap the
  // recorded data until 15 seconds after the event.
  _captureMemory = () => {
    const wait = 15 * 1000

    console.log('_captureMemory: Started...')

    setTimeout(() => {
      const memory = new Blob([...this.recordedBlobs], { type: this.captureMimetype })
      console.log('_captureMemory: Done.')
      console.log('memory', memory)
    }, wait)
  }

  _handleMediaRecorderData = ({ data }) => {
    // Clamp the recording to 30 seconds
    while (this.recordedBlobs.length >= 300) {
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

    setInterval(this._captureMemory, 15000)

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
