import BlockType from '../../extension-support/block-type'
import ArgumentType from '../../extension-support/argument-type'
import Cast from '../../util/cast'
import translations from './translations.json'
import blockIcon from './block-icon.png'
import { estimatePrivateCarDrivingFootprint } from './mobility/private-car-driving'
import { estimateAirplaneAnnualFootprint } from './mobility/airplane'

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
    const carIntensityFactorFirstKey = Cast.toString(
      args.carIntensityFactorFirstKey
    )
    const carChargingKey = Cast.toString(args.carChargingKey)
    const electricityIntensityKey = Cast.toString(args.electricityIntensityKey)
    const carPassengersFirstKey = Cast.toString(args.carPassengersFirstKey)
    const privateCarAnnualMileage = Cast.toNumber(args.privateCarAnnualMileage)

    return estimatePrivateCarDrivingFootprint(
      privateCarAnnualMileage,
      carIntensityFactorFirstKey,
      carPassengersFirstKey,
      carChargingKey,
      electricityIntensityKey
    )
  }

  airplaneTraveling(args) {
    const mileageByAreaFirstKey = Cast.toString(args.mileageByAreaFirstKey)
    const annualTravelingTime = Cast.toNumber(args.annualTravelingTime)
    if (mileageByAreaFirstKey === 'number-input') {
      return estimateAirplaneAnnualFootprint(annualTravelingTime)
    } else {
      return estimateAirplaneAnnualFootprint(undefined, mileageByAreaFirstKey)
    }
  }

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
            carIntensityFactorFirstKey: {
              type: ArgumentType.STRING,
              menu: 'carIntensityFactorFirstKey',
              defaultValue: 'gasoline'
            },
            carPassengersFirstKey: {
              type: ArgumentType.STRING,
              menu: 'carPassengersFirstKey',
              defaultValue: '1'
            },
            carChargingKey: {
              type: ArgumentType.STRING,
              menu: 'carChargingKey',
              defaultValue: 'unknown'
            },
            electricityIntensityKey: {
              type: ArgumentType.STRING,
              menu: 'electricityIntensityKey',
              defaultValue: 'unknown'
            },
            privateCarAnnualMileage: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
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
        }
      ],
      menus: {
        carIntensityFactorFirstKey: {
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
        carChargingKey: {
          acceptReporters: false,
          items: this.menuItems([
            'charge-almost-at-home',
            'use-charging-spots-occasionally',
            'use-charging-spots-sometimes',
            'use-charging-spots-usually',
            'unknown'
          ])
        },
        electricityIntensityKey: {
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
        carPassengersFirstKey: {
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
        },
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
      }
    }
  }
}

export { ExtensionBlocks as default, ExtensionBlocks as blockClass }
