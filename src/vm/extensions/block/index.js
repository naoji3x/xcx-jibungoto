import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from 'cfp-calc/mobility'
import moment from 'moment'
import ArgumentType from '../../extension-support/argument-type'
import BlockType from '../../extension-support/block-type'
import Cast from '../../util/cast'
import blockIcon from './block-icon.png'
import translations from './translations.json'

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = (messageData) => messageData.defaultMessage

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
  const localeSetup = formatMessage.setup()
  if (localeSetup && localeSetup.translations[localeSetup.locale]) {
    Object.assign(
      localeSetup.translations[localeSetup.locale],
      translations[localeSetup.locale]
    )
  }
}

const EXTENSION_ID = 'jibungotoPlanet'

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL =
  'https://naoji3x.github.io/xcx-jibungoto/dist/jibungotoPlanet.mjs'

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class ExtensionBlocks {
  /**
   * @return {string} - the name of this extension.
   */
  static get EXTENSION_NAME() {
    return formatMessage({
      id: 'jibungotoPlanet.name',
      default: 'Jibungoto Planet',
      description: 'name of the extension'
    })
  }

  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return EXTENSION_ID
  }

  /**
   * URL to get this extension.
   * @type {string}
   */
  static get extensionURL() {
    return extensionURL
  }

  /**
   * Set URL to get this extension.
   * The extensionURL will be changed to the URL of the loading server.
   * @param {string} url - URL
   */
  static set extensionURL(url) {
    extensionURL = url
  }

  /**
   * Construct a set of blocks for Jibungoto Planet.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime

    if (runtime.formatMessage) {
      // Replace 'formatMessage' to a formatter which is used in the runtime.
      formatMessage = runtime.formatMessage
    }
  }

  privateCarDriving(args) {
    const carType = Cast.toString(args.carType)
    const carCharging = Cast.toString(args.carCharging)
    const electricityType = Cast.toString(args.electricityType)
    const carPassengers = Cast.toString(args.carPassengers)
    const mileage = Cast.toNumber(args.mileage)

    return (
      estimatePrivateCarDrivingAmount({
        mileage
      }) *
      estimatePrivateCarDrivingIntensity({
        carType,
        carPassengers,
        carCharging,
        electricityType
      })
    )
  }

  dateTime(args) {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

  /*
  airplaneTraveling(args) {
    const mileageByAreaFirstKey = Cast.toString(args.mileageByAreaFirstKey)
    const annualTravelingTime = Cast.toNumber(args.annualTravelingTime)
    if (mileageByAreaFirstKey === 'number-input') {
      return estimateAirplaneAnnualFootprint({ annualTravelingTime })
    } else {
      return estimateAirplaneAnnualFootprint({ mileageByAreaFirstKey })
    }
  }

  ferryTraveling(args) {
    const mileageByAreaFirstKey = Cast.toString(args.mileageByAreaFirstKey)
    const annualTravelingTime = Cast.toNumber(args.annualTravelingTime)
    if (mileageByAreaFirstKey === 'number-input') {
      return estimateFerryAnnualFootprint({ annualTravelingTime })
    } else {
      return estimateFerryAnnualFootprint({ mileageByAreaFirstKey })
    }
  }

  trainTraveling(args) {
    const mileageByAreaFirstKey = Cast.toString(args.mileageByAreaFirstKey)
    const weeklyTravelingTime = Cast.toNumber(args.weeklyTravelingTime)
    const annualTravelingTime = Cast.toNumber(args.annualTravelingTime)
    if (mileageByAreaFirstKey === 'number-input') {
      return estimateTrainAnnualFootprint({
        weeklyTravelingTime,
        annualTravelingTime
      })
    } else {
      return estimateTrainAnnualFootprint({ mileageByAreaFirstKey })
    }
  }

  busTraveling(args) {
    const mileageByAreaFirstKey = Cast.toString(args.mileageByAreaFirstKey)
    const weeklyTravelingTime = Cast.toNumber(args.weeklyTravelingTime)
    const annualTravelingTime = Cast.toNumber(args.annualTravelingTime)
    if (mileageByAreaFirstKey === 'number-input') {
      return estimateBusAnnualFootprint({
        weeklyTravelingTime,
        annualTravelingTime
      })
    } else {
      return estimateBusAnnualFootprint({ mileageByAreaFirstKey })
    }
  }
  */

  menuItems(items) {
    return items.map((item) => {
      const id = 'jibungotoPlanet.' + item
      return {
        value: item,
        text: formatMessage({
          id,
          default: translations.en[id]
        })
      }
    })
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    setupTranslations()
    return {
      id: ExtensionBlocks.EXTENSION_ID,
      name: ExtensionBlocks.EXTENSION_NAME,
      extensionURL: ExtensionBlocks.extensionURL,
      blockIconURI: blockIcon,
      showStatusButton: false,
      blocks: [
        // Moment
        {
          opcode: 'dateTime',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: 'Now',
          func: 'dateTime'
        },

        // 自家用車の運転
        {
          opcode: 'private-car-driving',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'jibungotoPlanet.privateCarDriving',
            default: translations.en,
            description: 'estimate Private car driving footprint'
          }),
          func: 'privateCarDriving',
          arguments: {
            carType: {
              type: ArgumentType.STRING,
              menu: 'carType',
              defaultValue: 'gasoline'
            },
            carPassengers: {
              type: ArgumentType.STRING,
              menu: 'carPassengers',
              defaultValue: '1'
            },
            carCharging: {
              type: ArgumentType.STRING,
              menu: 'carCharging',
              defaultValue: 'unknown'
            },
            electricityType: {
              type: ArgumentType.STRING,
              menu: 'electricityType',
              defaultValue: 'unknown'
            },
            mileage: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        }
        /*
        // 電車の移動
        {
          opcode: 'train',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'jibungotoPlanet.train',
            default: translations.en,
            description: 'estimate train traveling footprint'
          }),
          func: 'trainTraveling',
          arguments: {
            weeklyTravelingTime: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            annualTravelingTime: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            mileageByAreaFirstKey: {
              type: ArgumentType.STRING,
              menu: 'mileageByAreaFirstKey',
              defaultValue: 'number-input'
            }
          }
        },
        // バスの移動
        {
          opcode: 'bus',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'jibungotoPlanet.bus',
            default: translations.en,
            description: 'estimate bus traveling footprint'
          }),
          func: 'busTraveling',
          arguments: {
            weeklyTravelingTime: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            annualTravelingTime: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            mileageByAreaFirstKey: {
              type: ArgumentType.STRING,
              menu: 'mileageByAreaFirstKey',
              defaultValue: 'number-input'
            }
          }
        },
        // 飛行機の移動
        {
          opcode: 'airplane',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'jibungotoPlanet.airplane',
            default: translations.en,
            description: 'estimate airplane traveling footprint'
          }),
          func: 'airplaneTraveling',
          arguments: {
            annualTravelingTime: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            mileageByAreaFirstKey: {
              type: ArgumentType.STRING,
              menu: 'mileageByAreaFirstKey',
              defaultValue: 'number-input'
            }
          }
        },
        // フェリーの移動
        {
          opcode: 'ferry',
          blockType: BlockType.REPORTER,
          blockAllThreads: false,
          text: formatMessage({
            id: 'jibungotoPlanet.ferry',
            default: translations.en,
            description: 'estimate ferry traveling footprint'
          }),
          func: 'ferryTraveling',
          arguments: {
            annualTravelingTime: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            mileageByAreaFirstKey: {
              type: ArgumentType.STRING,
              menu: 'mileageByAreaFirstKey',
              defaultValue: 'number-input'
            }
          }
        }
        */
      ],
      menus: {
        carType: {
          acceptReporters: false,
          items: this.menuItems([
            'gasoline',
            'light',
            'hv',
            'phv',
            'ev',
            'unknown'
          ])
        },
        carCharging: {
          acceptReporters: false,
          items: this.menuItems([
            'charge-almost-at-home',
            'use-charging-spots-occasionally',
            'use-charging-spots-sometimes',
            'use-charging-spots-usually',
            'unknown'
          ])
        },
        electricityType: {
          acceptReporters: false,
          items: this.menuItems([
            'conventional',
            '30-renewable',
            '50-renewable',
            '100-renewable',
            'solar-panel',
            'unknown'
          ])
        },
        carPassengers: {
          acceptReporters: false,
          items: this.menuItems([
            '1',
            '1-2',
            '2',
            '2-3',
            '3',
            '3-4',
            '4-more',
            'unknown'
          ])
        }
        /*
        mileageByAreaFirstKey: {
          acceptReporters: false,
          items: this.menuItems([
            'number-input',
            'major-city-or-metropolitan-area',
            'city-150k-more',
            'city-50k-150k',
            'area-less-than-50k',
            'unknown'
          ])
        }
        */
      }
    }
  }
}

export { ExtensionBlocks as default, ExtensionBlocks as blockClass }
